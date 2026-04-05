const seasons = [
  {
    label: 'Season 1',
    title: 'Citi Arc',
    role: 'Software Developer',
    period: 'July 2022 - Present',
    summary: 'Large-scale financial systems, sanctions processing, rollout ownership, and production resilience.',
    points: [
      'Module lead for sanctions processing in a global rollout, helping decouple the module into an independent scalable service.',
      'Contributed to Express Payments rollout across APAC, EMEA, and SEPA across validation, sanctions, posting, and clearing-house flows.',
      'Led AWS setup for the Australia rollout in under a month and supported a stable go-live with zero deployment failures or restarts.',
      'Improved reliability through release hardening and 80%+ test coverage, and built Kafka-based migration work that delivered a 3x throughput increase.',
    ],
  },
]

const arsenal = [
  {
    title: 'Flame Breathing',
    text: 'Java, Spring Boot, microservices, REST APIs, Kafka, event-driven architecture',
  },
  {
    title: 'Thunder Breathing',
    text: 'Python, SQL, Pandas, NumPy, Airflow, Superset',
  },
  {
    title: 'Mist Breathing',
    text: 'Scikit-learn, PyTorch, TensorFlow, XGBoost, HuggingFace Transformers',
  },
  {
    title: 'Shadow Breathing',
    text: 'RAG pipelines, FAISS, embeddings, prompt-based systems, GenAI workflows',
  },
  {
    title: 'Castle Forge',
    text: 'AWS, GCP, MongoDB, PostgreSQL, Oracle, MySQL',
  },
]

const leadership = [
  'Department Technical Secretary: led the initiative to build a stronger alumni database and improve professional connections across the department.',
  'IV Labs Object Detection Team Member: worked on comparing object detection models and building an all-in-one selection-oriented solution.',
]

const About = () => {
  return (
    <main className="page-shell">
      <section className="page-intro info-card">
        <p className="section-label">About Me</p>
        <h2 className="section-title">Hi, I&apos;m Ankush Madan.</h2>
        <p className="section-text">
          I&apos;m a VNIT graduate and an Application Developer at Citi. I enjoy building reliable
          backend systems, working on financial platforms at scale, and exploring machine learning,
          data systems, and GenAI through projects that keep expanding my range.
        </p>
      </section>

      <section className="content-grid content-grid--balanced">
        <article className="info-card">
          <p className="section-label">Experience</p>
          <div className="season-list about-section-stack">
            {seasons.map((season) => (
              <div key={season.title} className="season-card">
                <div className="season-card__header">
                  <p className="season-card__label">{season.label}</p>
                  <p className="timeline-item__meta">{season.period}</p>
                </div>
                <h3 className="feature-title">{season.title}</h3>
                <p className="season-card__role">{season.role}</p>
                <p className="section-text">{season.summary}</p>
                <div className="list-card">
                  {season.points.map((point) => (
                    <p key={point} className="list-card__item">{point}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="info-card">
          <p className="section-label">Skills</p>
          <div className="feature-grid feature-grid--single about-section-stack">
            <div className="mini-panel">
              <h3 className="feature-title">Training Grounds</h3>
              <p className="section-text">Visvesvaraya National Institute of Technology (NIT Nagpur)</p>
              <p className="section-text">B.Tech in Chemical Engineering</p>
              <p className="section-text">Aug 2018 - May 2022</p>
            </div>

            <div className="arsenal-grid">
              {arsenal.map((item) => (
                <div key={item.title} className="arsenal-card">
                  <h3 className="feature-title">{item.title}</h3>
                  <p className="section-text">{item.text}</p>
                </div>
              ))}
            </div>

            <div className="mini-panel">
              <h3 className="feature-title">Leadership Notes</h3>
              {leadership.map((item) => (
                <p key={item} className="section-text section-text--spaced">{item}</p>
              ))}
            </div>
          </div>
        </article>
      </section>
    </main>
  )
}

export default About
