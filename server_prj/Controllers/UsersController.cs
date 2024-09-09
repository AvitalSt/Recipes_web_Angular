using Microsoft.AspNetCore.Mvc;
using server_prj.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace server_prj.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        public static List<User> Users = new List<User>()
        {
            new User{idU=1,nameU="avi",address="rbi akiva",email="avi@gmail.com",password="a123"},
            new User{idU=2,nameU="dani",address="arv kuk",email="dani@gmail.com",password="123456"},
            new User{idU=3,nameU="beni",address="rbi yossi",email="beni@gmail.com",password="123456"},
        };
        private static int countId=4;
        // GET: api/<UsersController>
        [HttpGet]
        public IEnumerable<User> Get()
        {
            return Users;
        }

        // GET api/<UsersController>/5
        [HttpGet("{id}")]
        public User Get(int id)
        {
            var user= Users.Find(x => x.idU==id);
            return user ;
        }

        // POST api/<UsersController>
        [HttpPost]
        public User Post([FromBody] User newUser)
        {
            Users.Add(new User { idU=countId,nameU = newUser.nameU, address = newUser.address, email = newUser.email, password = newUser.password });
            countId++;
            return newUser ;
        }

        // PUT api/<UsersController>/5
        [HttpPut("{id}")]
        public User Put(int id, [FromBody] User updateUser)
        {
            var user=Users.Find(x => x.idU==id);
            if (user.nameU != updateUser.nameU&&updateUser.nameU!="string")
                user.nameU = updateUser.nameU;
            if(user.address != updateUser.address&&updateUser.address != "string")
                user.address = updateUser.address;
            if(user.email!=updateUser.email&&updateUser.email != "string")
                user.email = updateUser.email;
            if(user.password!=updateUser.password&&updateUser.password!="string")
                user.password = updateUser.password;
            return user ;
        }

        // DELETE api/<UsersController>/5
        [HttpDelete("{id}")]
        public List<User> Delete(int id)
        {
            var newUsers=Users.FindAll(x=>x.idU!=id);
            Users = newUsers;
            return Users;
        }
    }
}
