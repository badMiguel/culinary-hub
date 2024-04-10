Project Breif

Cooking websites design

Problem Context:
Our cooking website aims to provide a platform for users to share, discover, and engage with recipes. However, we have identified a challenge in motivating users to actively participate in recipe exploration and adoption. We have observed that the example product/service website similar to our goal lack efficient filtering options based on key factors such as preparation time, allergens, dietary requirements, and cooking skill levels. This limitation hampers users' ability to discover relevant recipes tailored to their specific preferences and constraints
Furthermore, there is a perception among users that recipes created or endorsed by professional chefs are of higher quality, more trustworthy, or more appealing compared to recipes shared by non-professionals or amateurs. However, the current lack of user engagement and recipe adoption on our platform poses a risk to its sustainability and growth. Without addressing these issues, we may fail to capitalize on the potential of user-generated content and risk losing users to competitors offering curated content.
How might we design and optimize our cooking website to enhance user engagement, encourage recipe adoption, and improve user experience and satisfaction through robust filtering mechanisms based on factors such as prep time, allergens, dietary requirements, and cooking skill?

Goal:
We aim to redesign and develop a cooking website to provide users with an intuitive, personalised, and accessible culinary experience. The website aims to address the following user needs and expectations:
Easy navigation and search functionality for finding recipes quickly.
Personalized recipe recommendations based on user preferences and dietary restrictions.
Mobile responsiveness for seamless across devices.
High-quality multimedia content, including videos, images and step-by-step instructions.

Technologies to be Used:
Front-end development: HTML, CSS, and JavaScript to build the user experience.
Backend development: python and API development.
Trollo: Used for visual project management and task tracking.
Jira: Used for comprehensive project management, issue tracking, and agile development.
Bitbucket: Used for version control, collaborative software development and hosting git or mercurial repositories.

Business Assumptions:
This recipe website targets users who want to explore and discover new recipes. It assumes users might have dietary restrictions or varying skill levels, and addresses this with filtering and searching functionalities. The mobile-friendly website aims to provide a user-friendly experience with clear instructions, substitution suggestions, and recipe ratings. User acquisition will focus on social media marketing and search engine optimization to compete with existing recipe websites. Success will be measured through user engagement, positive reviews, and a growing user base. The project acknowledges the possibility of failure if user needs aren't met or the competitive landscape changes.

User Assumptions:
The recipe website caters to users with a passion for cooking and exploring new dishes. We assume these users might have dietary restrictions or limitations based on their skill level. They likely turn to recipe websites for inspiration and planning meals. Their specific needs may differ depending on experience and lifestyle, but all value user-friendly features like clear instructions, recipe substitutions, and helpful ratings. Additionally, an attractive and intuitive interface is considered crucial for a positive user experience.

Key Features to Implement:

User-friendly interface with intuitive navigation and search functionality.
Personalized recipe recommendations based on user preferences, dietary restrictions and browsing history.
Mobile responsiveness for optimal viewing experience on smartphones and tablets.
Integration of multimedia content such as videos, images and step-by-step recipe instructions.
User authentication and profile management to save favourite recipes and customise preferences.
Accessibility enhancements include screen reader support, keyboard shortcuts, and text resizing options.

Project Improvement:

Promote healthy eating habits with nutritional information and meal planning.
Continuously optimise the platform based on user feedback and analytics.

Hypothesis Statements:

We believe users will find our recipe website more engaging and user-friendly compared to existing options.
We will know we're right when we see positive user reviews highlighting the ease of use and variety of recipes offered. Additionally, we'll track metrics like user session duration and recipe exploration depth.

MVP:
Recipe Cards:
Display recipe title, image, and brief information like allergens, prep time, cooking difficulty, and dietary requirements. Card can also be used to like or save the recipe.
In the next stage, clicking a card would lead to a detailed recipe page.


Information Architecture:

                  +-------------------+
                  |       Home        | (Landing Page)
                  +-------------------+
                          |
                          v
                  +-------------------+
                  |  Search Bar       |
                  +-------------------+
                          |
                          v
                  +-------------------+
                  |    Browse All     |
                  | (Recipe List)      |
                  +-------------------+
                          |
                          v (Filtering Options)
                +---------+---------+---------+
                |Prep Time | Skill Level | Diet |
                |         |              |      |
                +---------+---------+---------+
                          |
                          v
                 +-------------------+  (Click on Card) +-------------------+
                 | Recipe Card (List) |    ------>      | Detailed Recipe  |
                 | (Multiple Cards)   |                 | (Single Recipe)  |
                 +-------------------+                  +-------------------+
                          |
                          v 
                 +-------------------+
                 | User Profile      |
                 +-------------------+
                          |
                          v (Optional)
                 +-------------------+
                 | Saved Recipes     |
                 +-------------------+
                          |
                          v (Optional)
                 +-------------------+
                 | Settings          |
                 +-------------------+

Home (Landing Page):

Serves as the entry point for users.
May showcase featured recipe cards, categories, or search bar.

Search Bar:
Allows users to search recipes by keyword, ingredient, or other criteria.

Browse All (Recipe List):
Displays a list of all recipes in the database.
May be paginated for easier browsing.

Filtering Options:
Prep Time (e.g., Less than 30 min, 30 min - 1 hour, etc.)
Skill Level (e.g., Beginner, Intermediate, Advanced)
Dietary Requirements (e.g., Vegan, Gluten-Free, etc.)

Recipe Card (List):
Each card displays a brief overview of a recipe, including:
Image
Title
Prep Time
Cooking Skill Level
Dietary Requirements

Detailed Recipe:
Clicking a recipe card takes the user to a dedicated page with full details, including:
Ingredients list with quantities
Step-by-step instructions
Nutritional information (optional)
Ratings and reviews (optional)

User Profile (Optional):
Allows users to create an account and manage preferences.
May include features like:
Saved recipes
Dietary restrictions
Favorite cooking styles

Saved Recipes (Optional):
Stores recipes the user has marked for future reference (requires user profile).

Settings (Optional):
Allows users to personalize their experience (e.g., adjust font size, change language).

