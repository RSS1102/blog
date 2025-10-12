export default function BlogPage() {
  const posts = [
    { id: 1, title: "第一篇文章", excerpt: "这是第一篇文章的摘要。" },
    { id: 2, title: "第二篇文章", excerpt: "这是第二篇文章的摘要。" },
  ];

  return (
    <section className="list">
      <div className="card glass">
        <h2>文章列表</h2>
        <ul>
          {posts.map((p) => (
            <li key={p.id} className="post">
              <h3>{p.title}</h3>
              <p>{p.excerpt}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
