using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using todo_list.Models;
using todo_list.Services;


namespace todo_list.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("ReactPolicy")]
    public class TodoController : ControllerBase
    {
        private readonly TodoService todoService;
        public TodoController(TodoService todoService)
        {
            this.todoService = todoService;
        }
        // GET api/todos
        [HttpGet]
        public IEnumerable<Todo> Get()
        {
            return todoService.GetAll();
        }
        // GET api/todos/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return Ok(todoService.GetById(id));
        }
        // POST api/todos
        [HttpPost]
        public IActionResult Post([FromBody] Todo todo)
        {
            return CreatedAtAction("Get", new { id = todo.Id }, todoService.Create(todo));
        }
        // PUT api/todos/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Todo todo)
        {
            todoService.Update(id, todo);
            return NoContent();
        }
        // DELETE api/todos/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            todoService.Delete(id);
            return NoContent();
        }
        public override NoContentResult NoContent()
        {
            return base.NoContent();
        }
    }
}
