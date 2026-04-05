const projects = [
  {
    title: 'Infinity Fantasy League',
    type: 'Full-Stack Build',
    status: 'Built',
    text: 'Fantasy cricket web application focused on local cricket leagues, player selections, and leaderboard tracking using real-time performance data via cricHeroes.',
    stack: 'Spring Boot, Angular, MongoDB, GCP',
  },
  {
    title: 'Credit Card Fraud Detection System',
    type: 'Machine Learning',
    status: 'Built',
    text: 'End-to-end ML pipeline for fraud detection on imbalanced financial datasets with comparative model evaluation using ROC-AUC and precision-recall metrics.',
    stack: 'Python, Pandas, Scikit-learn, XGBoost',
  },
  {
    title: 'Emotion Classification Using BERT',
    type: 'NLP',
    status: 'Built',
    text: 'Fine-tuned a pre-trained BERT model for multi-class emotion classification with a PyTorch training pipeline, tokenization, attention masks, and hyperparameter tuning.',
    stack: 'PyTorch, HuggingFace Transformers, NLP',
  },
]

const Projects = () => {
  return (
    <main className="page-shell">
      <section className="page-intro info-card">
        <p className="section-label">Mission Board</p>
        <h2 className="section-title">A few missions from the archive.</h2>
        <p className="section-text">
          A quiet collection of builds shaped by systems thinking, experimentation, and a little
          bit of chaos from the castle.
        </p>
      </section>

      <section className="project-grid">
        {projects.map((project) => (
          <article key={project.title} className="info-card project-card">
            <div className="project-card__top">
              <p className="project-type">{project.type}</p>
              <p className="project-status">{project.status}</p>
            </div>
            <h3 className="section-title">{project.title}</h3>
            <p className="section-text">{project.text}</p>
            <p className="project-stack">{project.stack}</p>
          </article>
        ))}
      </section>
    </main>
  )
}

export default Projects
