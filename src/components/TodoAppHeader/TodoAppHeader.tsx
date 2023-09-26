import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { ErrorMessage } from '../../utils/errorMessages';

type Props = {
  todos: Todo[];
  onTodoAdd: (todoTitle: string) => Promise<void>;
  setErrorMessage: (value: ErrorMessage) => void;
  onToggleClick: () => void;
  isRequesting: boolean;
  isAllCompleted: boolean;
};

export const TodoAppHeader: React.FC<Props> = ({
  todos,
  onTodoAdd,
  setErrorMessage,
  onToggleClick,
  isRequesting,
  isAllCompleted,
}) => {
  const [todoTitle, setTodoTitle] = useState('');
  const inputFocus = useRef<HTMLInputElement | null>(null);

  const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(event.target.value);
  };

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (todoTitle.trim().length === 0) {
      setErrorMessage(ErrorMessage.Title);

      return;
    }

    onTodoAdd(todoTitle.trim())
      .then(() => {
        setTodoTitle('');
      })
      .catch(() => {

      });
  };

  useEffect(() => {
    console.log('inputtest')
    if (inputFocus.current) {
      inputFocus.current.focus();
    }
  }, [todos]);

  return (
    <header className="todoapp__header">
      {Boolean(todos.length) && (
        // eslint-disable-next-line jsx-a11y/control-has-associated-label
        <button
          type="button"
          className={cn('todoapp__toggle-all', {
            active: isAllCompleted,
          })}
          data-cy="ToggleAllButton"
          onClick={() => onToggleClick()}
        />
      )}

      <form
        onSubmit={onFormSubmit}
      >
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          ref={inputFocus}
          value={todoTitle}
          onChange={onTitleChange}
          disabled={isRequesting}
        />
      </form>
    </header>
  );
};