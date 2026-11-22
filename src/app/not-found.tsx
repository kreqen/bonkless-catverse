import Link from 'next/link'
import { PageIntro } from '@/components/page-intro'
export default function NotFound() {
  return (
    <section className="shell inner">
      <PageIntro label="404 · LOST IN THE CATVERSE" title="CAT NOT FOUND.">
        He probably crawled into a box.
      </PageIntro>
      <Link className="button lime" href="/">
        Back to home
      </Link>
    </section>
  )
}
