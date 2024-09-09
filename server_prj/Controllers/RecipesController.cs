using Microsoft.AspNetCore.Mvc;
using server_prj.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace server_prj.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecipesController : ControllerBase
    {
        public static List<Recipe> Recipes = new List<Recipe>()
        {
            new Recipe(){idR=1,nameR="פיצה",time=90,level=3,imageUrl="https://storage.hidabroot.org/articles_new/136697_tumb_750Xauto.jpg",
                idC=1,listComponents = new[] {"קמח","שמן","מים","פלפל","תירס","בצל","גבינה","תות"},
                prepartion = new[] {"להכין בצק מהקמח, השמן והמים.","לשים את השקית של הקמח בתוך הבצק וללוש היטב.","להוסיף את השמרים ולהמתין עד שהבצק יתפח.","לרדד את הבצק ולהניח אותו על תבנית האפייה.","לשפוך רוטב פיצה על הבצק ולפזר עליו את התוספות: גבינה, תירס, בצל ופלפל .","לאפות בתנור שחומם מראש ל-200 מעלות עד שהפיצה מוכנה."},idU=1},
            new Recipe(){idR=2,nameR="סלט צבעוני",time=20,level=1,imageUrl="https://veg.co.il/wp-content/uploads/colorful-beet-leaves-salad.jpg",
                idC=1 ,listComponents = new[] {"חסה","גזר","עגבניה","מלפפון","פלפל","קולרבי","בצל","שום","פרוזליה","שמן","מלח"}
                /*            ,prepartion=new[]{"שטף היטב את כל הירקות תחת מים זורמים.","קצוץ את החסה לרצועות ושים בקערה גדולה.","גרד את הגזר בעזרת מגרף גס והוסף אותו לקערה.","חתוך את העגבניה לקוביות קטנות והוסף אותה לקערה.", "חתוך את המלפפון לקוביות והוסף אותו לקערה.","קצוץ את הפלפל לקוביות קטנות והוסף אותו לקערה.","קצוץ את הקולרבי לרצועות דקות והוסף אותו לקערה.","קצוץ את הבצל לרצועות דקות והוסף אותו לקערה.", "גרר את השום בעזרת מגרף גס והוסף אותו לקערה.","קצוץ את הפרוזליה לחתיכות גסות והוסף אותה לקערה.", "יבש את הירקות המוכנים בעזרת מטלית נקייה כדי להסיר כל נותרי לחות.", "בעזרת מטרפה גדולה, ערבב היטב את כל המרכיבים יחד בקערה.","בעת הגשה, טגני כל הירקות עם שמן זית ומלח לפי הטעם.","הסלט מוכן להגשה. ניתן לפזר עליו תוספות כמו זעתר טחון או גרעיני חמניה לטעם נוסף." },idU=1},
                        new Recipe() {idR = 3,nameR = "עוגת שוקולד עשירה",time = 60,level = 2,imageUrl = "https://img.mako.co.il/2019/06/18/choclate_cake_kerenagam_amir3_i.jpg",
                            idC = 2,listComponents = new[] {"קמח", "סוכר", "שמן", "ביצים", "קוקאו", "ואניל", "חלב", "מלח"},prepartion = new[] {"חמם את התנור ל-180 מעלות.","ערבב את הקמח, הסוכר, אבקת האפייה, הקקאו והמלח בקערה גדולה.","הוסף את הביצים, השמן והחלב לתערובת הקמח וערבב עד לקבלת תערובת חלקה.","המיס את השוקולד המריר באמבט מים או במיקרוגל והוסף אותו לתערובת.","שמן תבנית אפייה ושפוך לתוכה את התערובת.","אפה בתנור שחומם מראש במשך כ-30-35 דקות או עד שקיסם יוצא נקי מהעוגה.","תן לעוגה להתקרר לפני ההגשה. ניתן לפזר אבקת סוכר או לשים קצפת מעל לקישוט נוסף."},idU = 1}*/
            }
        };
        private static int countId = 3;
        // GET: api/<RecipesController>
        [HttpGet]
        public IEnumerable<Recipe> Get()
        {
            return Recipes;
        }

        // GET api/<RecipesController>/5
        [HttpGet("{id}")]
        public Recipe Get(int id)
        {
            var recipe = Recipes.Find((x) => x.idR == id);
            return recipe;
        }

        // POST api/<RecipesController>
        [HttpPost]
        public Recipe Post([FromBody] Recipe newRecipe)
        {
            newRecipe.idR = countId++;
            Recipes.Add(newRecipe);
            return newRecipe;
        }


        // PUT api/<RecipesController>/5
        [HttpPut("{id}")]
        public Recipe Put(int id, [FromBody] Recipe updateRecipe)
        {
            var recipe = Recipes.Find((x) => x.idR == id);
                recipe.nameR = updateRecipe.nameR;
                recipe.idC = updateRecipe.idC;
                recipe.time = updateRecipe.time;
                recipe.level = updateRecipe.level;
                recipe.date = updateRecipe.date;
                recipe.imageUrl = updateRecipe.imageUrl;
                recipe.listComponents = updateRecipe.listComponents;
                recipe.prepartion = updateRecipe.prepartion;
                recipe.idR = id;
                return recipe;
        }

        // DELETE api/<RecipesController>/5
        [HttpDelete("{id}")]
        public List<Recipe> Delete(int id)
        {
            var newRecipes = Recipes.FindAll(x => x.idR != id);
            Recipes = newRecipes;
            return Recipes;
        }
    }
}
