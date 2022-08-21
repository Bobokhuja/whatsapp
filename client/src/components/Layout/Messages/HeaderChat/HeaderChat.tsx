import classes from './HeaderChat.module.scss'

interface IHeaderChat {
  name: string
  status: string | null
}

function HeaderChat({name, status}: IHeaderChat) {
  return (
    <div className={classes.HeaderChat}>
      <div className={classes.avatar}>
        <img src="https://picsum.photos/100/100" alt="Avatar"/>
      </div>
      <p className={classes.Name}>{name}</p>
    </div>
  )
}

export default HeaderChat