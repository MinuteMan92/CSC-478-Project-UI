import Button from 'material-ui/Button'
import {
  DialogContent,
} from 'material-ui/Dialog'
import PropTypes from 'prop-types'
import React from 'react'
import TextField from 'material-ui/TextField'
import { connect } from 'react-redux'
import { actions as movieLookupActions } from '../../redux/actions/movieLookupActions'


const SelectMovieCopy = ({
  copyExists,
  newMovieCopy,
  setNewMovieCopy,
  selectedCopy,
  copiesList,
  transactionMovieList,
  selectedMovieTitle,
  setSelectedCopy,
  createCopy,
}) => {
  const movieCopySelected = copyID =>
    transactionMovieList.find(transactionMovie => transactionMovie.title === selectedMovieTitle && transactionMovie.copyID === copyID) !== undefined

  const addMovieCopyAction = () => {
    createCopy()
    setNewMovieCopy('')
  }

  const copyListTable = () => {
    const copyTable = copiesList.map(copy => (
      <Button
        color='primary'
        disabled={movieCopySelected(copy)}
        key={copy}
        onClick={() => setSelectedCopy(copy)}
        style={{ width: '100%' }}
        variant={copy === selectedCopy ? 'raised' : 'flat'}
      >
        {copy}
      </Button>
    ))

    return copyTable.length > 0 ? (
      <div>
        {copyTable}
      </div>
    ) :
      (
        <div>
          <div><div style={{ textAlign: 'center', color: 'red' }}>No Copies Exist</div><br /></div>
        </div>
      )
  }


  return (
    <div style={{ width: '500px' }}>
      <DialogContent>

        <div style={{ flex: '1', textAlign: 'center' }}>
          <TextField
            error={copyExists}
            label={copyExists ? 'Copy Already Exists' : 'New Movie Copy'}
            onChange={event => setNewMovieCopy(event.target.value)}
            value={newMovieCopy}
          />

          &nbsp;&nbsp;

          <Button
            disabled={newMovieCopy === '' ? true : copiesList.includes(newMovieCopy)}
            onClick={addMovieCopyAction}
            variant='raised'
          >
            Create
          </Button>

        </div>

        <br /><br />
        {copyListTable()}

      </DialogContent>
    </div>
  )
}


SelectMovieCopy.propTypes = {
  copiesList: PropTypes.array.isRequired,
  copyExists: PropTypes.bool.isRequired,
  createCopy: PropTypes.func.isRequired,
  newMovieCopy: PropTypes.string.isRequired,
  selectedCopy: PropTypes.string.isRequired,
  selectedMovieTitle: PropTypes.string.isRequired,
  setNewMovieCopy: PropTypes.func.isRequired,
  setSelectedCopy: PropTypes.func.isRequired,
  transactionMovieList: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
  newMovieCopy: state.movieLookup.newMovieCopy,
  selectedCopy: state.movieLookup.selectedCopy,
  copiesList: state.movieLookup.copiesList,
  transactionMovieList: state.transaction.movieList,
  selectedMovieTitle: state.movieLookup.selectedMovie.title,
  copyExists: state.movieLookup.copyExists,
})


const actions = {
  ...movieLookupActions,
}

export default connect(mapStateToProps, actions)(SelectMovieCopy)
