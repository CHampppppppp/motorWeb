 
export default function AboutPage() {
    const articles = [
      {
        title: '数据可信',
        content: '整合公开参数与实际口碑，提供标准化字段与可视化对比，保证信息可验证、可复用。'
      },
      {
        title: '体验友好',
        content: '简洁的筛选与排序、可选对比栏、无打扰的阅读体验，让你把注意力放在内容上。'
      },
      {
        title: '开放演进',
        content: '前端使用 Vite+React 与原生 ES 模块，结构清晰、易于扩展，欢迎提出改进建议。'
      },
    ]

    return (
    <main className="container" aria-live="polite">
      <section className="my-8 mb-6 mx-0 text-center py-[40px] px-[20px] bg-gradient-to-br from-tran1 to-tran2 rounded-xl border-1 border-solid border-border" aria-label="项目简介">
        <h1 className='text-4xl my-0 mx-0 mb-4 text-text font-bold tracking-[-0.5px]'>关于 MotorWeb</h1>
        <p className="text-muted leading-[1.8] text-xl max-w-[600px] my-0 mx-auto">一个帮你选出最合适摩托车的网站。我们致力于提供清晰、可信、可对比的车型信息与实用文章，帮助你更高效地做出选择。</p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-8 mx-0 mb-10 " aria-label="核心理念">
        {articles.map((article,index)=>{
          return (
              <article key={index} className="border border-solid border-border bg-card p-6 rounded-xl shadow-md transition-all duration-300 ease-in relative overflow-hidden hover:transform hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(0,0,0,0.15)] hover:border-accent w-full">
          <h2 className='text-[20px] my-0 mx-0 mb-3 text-brand font-bold'>{article.title}</h2>
          <p className='m-0 text-text leading-[1.6] '>{article.content}</p>
        </article>
          )
        })}
      </section>

      <section className="border-t-2 border-solid border-border py-8 px-0 mt-6" aria-label="联系与反馈">
        <h2 className='text-2xl my-0 mx-0 mb-4 text-brand font-[600]'>联系与反馈</h2>
        <p className='text-left mb-2'>有错误、建议或想法？欢迎通过以下方式联系：</p>
        <ul className="leading-[1.8]">
          <li className='text-left text-text'>发送邮件至：<a href="mailto:1handsome3206@gmail.com" className='text-accent no-underline transition duration-200 ease-in-out hover:text-brand hover:underline'>1handsome3206@gmail.com</a></li>
          <li className='text-left text-text'>个人微信：19012712046</li>
        </ul>
      </section>
    </main>
    )
}