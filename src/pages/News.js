import "./News.css";

const News = () => {
    const newsList = [
     {
      title: "📜 Версія 1.1",
      date: "02.06.2025",
      content: "Виправлення деяких багів та покращення оптимізації",
     },  
      {
        title: "📜 Версія 1.0: Старт гри!",
        date: "01.06.2025",
        content: "Версія 1.0 тепер доступна для завантаження!",
      }
    ];

  return (
    <div className="news-container">
      <h1 className="news-title">📜 Останні новини</h1>
      <div className="news-list">
        {newsList.map((news, index) => (
          <div key={index} className="news-card">
            <h2 className="news-card-title">{news.title}</h2>
            <p className="news-card-date">{news.date}</p>
            <p className="news-card-content">{news.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
