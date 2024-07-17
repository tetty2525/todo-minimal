import * as React from 'react';
import { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { z } from 'zod';

interface TaskInputProps {
  onAddTask: (task: string) => void;
}

const taskSchema = z.string().min(1, "Task cannot be empty").refine((val) => val.trim().length > 0, {
  message: "Task cannot be just whitespace",
});

const TaskInput: React.FC<TaskInputProps> = ({ onAddTask }) => {
  const [taskInput, setTaskInput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleAddTask = async () => {
    const validationResult = taskSchema.safeParse(taskInput);
    if (!validationResult.success) {
      setError(validationResult.error.errors[0].message);
      return;
    }
    setError(null); // Clear any previous error

    const trimmedTask = taskInput.trim();
    await onAddTask(trimmedTask);
    console.log("Task added:", trimmedTask); // デバッグ情報

    setTaskInput('');
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleAddTask();
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        marginBottom: 2,
      }}
    >
      <TextField
        id="taskInput"
        label="Enter a task"
        variant="outlined"
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
        onKeyDown={handleKeyDown}
        sx={{ minWidth: 300 }}
        error={!!error} // Apply error style if there is an error
        helperText={error} // Display error message
      />
      <Button variant="contained" size="large" onClick={handleAddTask}>
        Add Task
      </Button>
    </Box>
  );
};

export default TaskInput;
