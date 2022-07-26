import classes from './Search.module.scss'
import Input from '../../form/Input/Input'

function Search() {
  return (
    <div className={classes.Search}>
      <input
        type="search"
        className={classes.Input}
        placeholder="Search"
      />
    </div>
  )
}

export default Search