using System.Diagnostics.Metrics;

namespace server_prj.Models
{
    public class Recipe
    {
        public int idR { get; set; }
        public string nameR { get; set; }
        public int idC {  get; set; }
        public int time { get; set; }
        public int level { get; set; }
        public DateTime date { get; set; }
        public string[] listComponents { get; set; }
        public string[] prepartion { get; set; }
        public int idU { get; set; }

        /*        public byte[] image { get; set; } 
        */
        public string imageUrl { get; set; }
    }
}

