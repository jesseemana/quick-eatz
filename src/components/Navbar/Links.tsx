import { Link } from 'react-router-dom';

const Links = ({ link, title, styles }: { link: string, title: string, styles: string }) => {
  return (
    <>
      <Link to={link} className={styles}>
        {title}
      </Link>
    </>
  )
}

export default Links;
