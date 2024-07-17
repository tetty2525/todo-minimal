import * as React from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import type { Schema } from '../../amplify/data/resource'; // Adjust the path as needed

interface TaskListProps {
  tasks: Schema["Todo"]["type"][]; // `tasks`プロパティの型定義
  onDeleteTask: (id: string) => void; // `onDeleteTask`プロパティの型定義
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDeleteTask }) => {
  console.log("Rendering tasks:", tasks); // tasks配列の内容を確認するためのコンソールログ

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {tasks.map((task) => (
        <ListItem key={task.id} sx={{ borderBottom: '1px solid #ddd' }}>
          <ListItemText primary={task.content} /> {/* 修正：titleからcontentに変更 */}
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="delete" onClick={() => onDeleteTask(task.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};

export default TaskList;
