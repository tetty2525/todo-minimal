"use client";

export const dynamic = 'force-dynamic'

import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import TaskList from '../sections/TaskList/TaskList';
import TaskInput from '../sections/TaskInput/TaskInput'; // 新しく追加
import { Amplify } from 'aws-amplify';
import outputs from '../../amplify_outputs.json';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../amplify/data/resource'; 

Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function App() {
  const [todos, setTodos] = useState<Schema["Todo"]["type"][]>([]);

  useEffect(() => {
    const sub = client.models.Todo.observeQuery().subscribe({
      next: ({ items }) => {
        console.log("Fetched items:", items); // デバッグ情報
        setTodos(items);
      },
      error: (err) => console.error("Subscription error:", err) // エラーハンドリング
    });

    return () => sub.unsubscribe();
  }, []);

  const createTodo = async (task: string) => {
    try {
      const response = await client.models.Todo.create({ content: task });;
      const newTodo = response.data as Schema["Todo"]["type"];
      console.log("Task created:", newTodo); // デバッグ情報
      setTodos((prevTodos) => {
        const updatedTodos = [...prevTodos, newTodo];
        console.log("Updated todos:", updatedTodos); // 更新後のtodos配列を確認
        return updatedTodos;
      }); // ローカルステートを即時更新
    } catch (error) {
      console.error("Create task error:", error); // エラーハンドリング
    }
  }

  const deleteTodo = async (id: string) => {
    try {
      await client.models.Todo.delete({ id });
      console.log("Task deleted:", id); // デバッグ情報
      setTodos((prevTodos) => prevTodos.filter(todo => todo.id !== id)); // ローカルステートを即時更新
    } catch (error) {
      console.error("Delete task error:", error); // エラーハンドリング
    }
  }

  return (     
    <Authenticator>
        {({ signOut, user }) => (
          <Box
            sx={{
              minHeight: '100vh',
              backgroundColor: '#f5f5f5',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 2,
            }}
          >
            <Typography variant="h2" component="h1" gutterBottom align="center">
              SelinのToDoリスト
            </Typography>
            <TaskInput onAddTask={createTodo} /> {/* 新しく追加 */}
            <TaskList onDeleteTask={deleteTodo} tasks={todos} />
            <button onClick={signOut}>Sign out</button>
          </Box>
        )}
    </Authenticator>
  );
}
