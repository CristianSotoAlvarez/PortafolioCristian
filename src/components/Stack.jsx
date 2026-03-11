import t from '../i18n'

const STACK_ITEMS = [
  {
    items: [
      { name: 'HTML5',      icon: 'https://cdn.simpleicons.org/html5/E34F26' },
      { name: 'CSS3',       icon: '/icons/css3.png' },
      { name: 'JavaScript', icon: 'https://cdn.simpleicons.org/javascript/F7DF1E' },
      { name: 'React',      icon: 'https://cdn.simpleicons.org/react/61DAFB' },
      { name: 'Angular',    icon: 'https://cdn.simpleicons.org/angular/DD0031' },
      { name: 'Ionic',      icon: 'https://cdn.simpleicons.org/ionic/3880FF' },
    ],
  },
  {
    items: [
      { name: 'Java',   icon: 'https://cdn.simpleicons.org/openjdk/ED8B00' },
      { name: 'Python', icon: 'https://cdn.simpleicons.org/python/3776AB' },
      { name: 'C',      icon: 'https://cdn.simpleicons.org/c/A8B9CC' },
    ],
  },
  {
    items: [
      { name: 'PostgreSQL', icon: 'https://cdn.simpleicons.org/postgresql/4169E1' },
      { name: 'MySQL',      icon: 'https://cdn.simpleicons.org/mysql/4479A1' },
      { name: 'SQLite',     icon: 'https://cdn.simpleicons.org/sqlite/003B57' },
      { name: 'SQL Server', icon: '/icons/sqlserver.png' },
    ],
  },
  {
    items: [
      { name: 'Vite',           icon: 'https://cdn.simpleicons.org/vite/646CFF' },
      { name: 'Git',            icon: 'https://cdn.simpleicons.org/git/F05032' },
      { name: 'GitHub',         icon: 'https://cdn.simpleicons.org/github/aaaaaa' },
      { name: 'Postman',        icon: 'https://cdn.simpleicons.org/postman/FF6C37' },
      { name: 'Figma',          icon: 'https://cdn.simpleicons.org/figma/F24E1E' },
      { name: 'Jira',           icon: 'https://cdn.simpleicons.org/jira/0052CC' },
      { name: 'Trello',         icon: 'https://cdn.simpleicons.org/trello/0052CC' },
      { name: 'Power Platform', icon: '/icons/powerplatform.png' },
    ],
  },
]

export default function Stack({ lang }) {
  const tr = t[lang].stack

  return (
    <section className="section" id="stack">
      <div className="container">
        <h2 className="section-title">{tr.title}</h2>
        <p className="section-subtitle">{tr.subtitle}</p>

        <div className="stack-categories">
          {STACK_ITEMS.map((group, i) => (
            <div key={i}>
              <div className="stack-category-title">{tr.categories[i]}</div>
              <div className="stack-grid">
                {group.items.map(item => (
                  <div className="stack-badge" key={item.name}>
                    <img src={item.icon} alt={item.name} />
                    {item.name}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
