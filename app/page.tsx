import { BlogPosts } from 'app/components/posts'

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Benjamin Chau 
      </h1>
      <p className="mb-4">
        {`I'm a second year computer science student at the University of Queensland, currently interning at `}
        <a 
          href="https://tiny.cloud" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-gray-300"
        >
          ↗ TinyMCE
        </a>
        {`.`}
      </p>
      <p className="mb-4">
        {`I'm currently building a problem-based learning platform that enables high school students to consolidate their mathematical concepts leading upto their final exams.
        `}
      </p>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  )
}
