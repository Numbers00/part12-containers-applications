import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import React from 'react'

import Todo from './Todo'

describe('Todo', () => {
  const todo = {
    text: 'Todo test 1',
    done: false
  }

  const onClickComplete = jest.fn()
  const onClickDelete = jest.fn()

  const doneInfo = (
    <>
      <span>This todo is done</span>
      <span>
        <button onClick={() => onClickDelete(todo)}> Delete </button>
      </span>
    </>
  )

  const notDoneInfo = (
    <>
      <span>
        This todo is not done
      </span>
      <span>
        <button onClick={() => onClickDelete(todo)}> Delete </button>
        <button onClick={() => onClickComplete(todo)}> Set as done </button>
      </span>
    </>
  )

  const user = userEvent.setup()
  test('renders the todo text', () => {
    render(
      <Todo todo={todo} doneInfo={doneInfo} notDoneInfo={notDoneInfo} />
    )

    expect(screen.getByText(todo.text)).toBeInTheDocument()
    expect(screen.getByText('This todo is not done')).toBeInTheDocument()
  })

  test('calls onClickComplete when the "Set as done" button is clicked', async () => {
    render(
      <Todo todo={todo} doneInfo={doneInfo} notDoneInfo={notDoneInfo} />
    )

    const button = screen.getByText(/Set as done/)
    await user.click(button)

    expect(onClickComplete).toHaveBeenCalled()
  })
})
