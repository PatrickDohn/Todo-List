using todo_list.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace todo_list.Services
{
    public class TodoService
    {
        private static List<Todo> todos = new List<Todo>();
        private static int Count = 1;
        private static readonly string[] names = new string[] { "" };

        static TodoService()
        {
            // Random rnd = new Random();
            // for (int i = 0; i < 5; i++)
            // {
            //     string currName = names[rnd.Next(names.Length)];
            //     User user = new User
            //     {
            //         Id = Count++,
            //         Name = currName + " " + surnames[rnd.Next(surnames.Length)],
            //         Email = currName.ToLower() + extensions[rnd.Next(extensions.Length)],
            //         Document = (rnd.Next(0, 100000) * rnd.Next(0, 100000)).ToString().PadLeft(10, '0'),
            //         Phone = "+1 888-452-1232"
            //     };
            //     users.Add(user);
            // }
        }
        public List<Todo> GetAll()
        {
            return todos;
        }
        public Todo GetById(int id)
        {
            return todos.Where(todo => todo.Id == id).FirstOrDefault();
        }
        public Todo Create(Todo todo)
        {
            todo.Id = Count++;
            todos.Add(todo);
            return todo;
        }
        public void Update(int id, Todo todo)
        {
            Todo found = todos.Where(n => n.Id == id).FirstOrDefault();
            found.Name = todo.Name;
        }
        public void Delete(int id)
        {
            todos.RemoveAll(n => n.Id == id);
        }
    }
}
