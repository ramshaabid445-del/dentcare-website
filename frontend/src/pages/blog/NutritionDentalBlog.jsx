import BlogLayout from "./BlogLayout";

const blog = {
  title: "Nutrition and Your Dental Health",
  category: "Oral Wellness",
  date: "28 June 2024",
  comments: "0",
  author: "Dr. Lisa Thompson",
  images: [
    "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1000&h=650&fit=crop&auto=format&q=85",
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=560&fit=crop&auto=format&q=85",
    "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&h=560&fit=crop&auto=format&q=85",
  ],
  intro: "Your diet plays a crucial role in the health of your teeth and gums. The foods and beverages you consume directly impact the strength of your enamel, the health of your gums, and your overall oral well-being. Understanding the connection between nutrition and dental health is the first step toward a brighter, healthier smile.",
  sections: [
    {
      heading: "Foods That Strengthen Your Teeth",
      content:
        "Calcium-rich foods such as dairy products, leafy greens, and almonds help build and maintain strong tooth enamel. Phosphorus, found in eggs, fish, and lean meats, works alongside calcium to protect and rebuild tooth structure. Vitamin D, obtained from sunlight and fortified foods, helps your body absorb these essential minerals effectively.",
      paragraph2:
        "Crunchy fruits and vegetables like apples, carrots, and celery act as natural toothbrushes. Their fibrous texture stimulates saliva production, which helps wash away food particles and neutralize harmful acids in your mouth.",
      image: "https://images.unsplash.com/photo-1543362906-acfc16c67564?w=800&h=560&fit=crop&auto=format&q=85",
    },
    {
      heading: "Foods to Limit for Better Oral Health",
      content:
        "Sugary foods and beverages are the primary culprits behind tooth decay. When sugar interacts with bacteria in your mouth, it produces acids that attack tooth enamel. Limiting your intake of candy, soda, and processed snacks can significantly reduce your risk of cavities.",
      paragraph2:
        "Acidic foods and drinks, including citrus fruits, tomatoes, and carbonated beverages, can also erode enamel over time. If you do consume acidic items, rinse your mouth with water afterward and wait at least 30 minutes before brushing to avoid damaging softened enamel.",
    },
    {
      heading: "Building a Tooth-Friendly Diet",
      content:
        "A balanced diet rich in whole foods is the foundation of excellent oral health. Incorporate a variety of colorful vegetables, lean proteins, whole grains, and healthy fats into your meals. Stay hydrated with plenty of water, which helps maintain saliva production and keeps your mouth clean.",
      paragraph2:
        "Remember that when you eat matters too. Frequent snacking exposes your teeth to acids throughout the day. Try to limit snacking between meals and choose tooth-friendly options like cheese, nuts, or fresh vegetables when you do need a snack.",
    },
  ],
  conclusion: "Your smile is a reflection of your overall health, and nutrition is a powerful tool in maintaining it. By making mindful food choices and maintaining good oral hygiene habits, you can protect your teeth and gums for years to come. Combine a healthy diet with regular dental checkups for the best possible oral health outcomes.",
};

export default function NutritionDentalBlog() {
  return <BlogLayout blog={blog} />;
}