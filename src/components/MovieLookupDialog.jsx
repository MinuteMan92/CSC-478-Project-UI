import Dialog, {
  DialogActions,
  DialogTitle,
} from 'material-ui/Dialog'
import Button from 'material-ui/Button'
import PropTypes from 'prop-types'
import React from 'react'
import SearchMovie from '../components/MovieLookupDialogContents/SearchMovie'
import SelectMovieCopy from '../components/MovieLookupDialogContents/SelectMovieCopy'
import { connect } from 'react-redux'
import { actions as movieLookupActions } from '../redux/actions/movieLookupActions'


const MovieLookupDialog = ({
  open,
  mode,
  selectedMovie,
  selectedCopy,
  copyID,
  setMode,
  closeMovieLookup,
  callbackFunction,
}) => {
  const validateButton = () => {
    if (mode === '') {
      return Object.keys(selectedMovie).length !== 0
    } else if (mode === 'copy') {
      return selectedCopy !== ''
    }

    return true
  }

  const confirmButtonAction = () => {
    callbackFunction({
      title: selectedMovie.title,
      copyID: selectedCopy,
    })
    closeMovieLookup()
  }

  const nextButtonAction = () => {
    if (copyID !== '' && selectedMovie.copies.includes(copyID)) {
      callbackFunction({
        title: selectedMovie.title,
        copyID,
      })
      closeMovieLookup()
    } else {
      setMode('copy')
    }
  }

  const contentByMode = () => {
    switch (mode) {
      case 'copy': return {
        content: (<SelectMovieCopy />),
        button: 'Confirm',
        buttonAction: confirmButtonAction,
        title: selectedMovie.title,
      }
      default: return {
        content: (<SearchMovie />),
        button: 'Next',
        buttonAction: nextButtonAction,
        title: 'Movie Lookup',
      }
    }
  }
  const content = contentByMode()


  return (
    <Dialog aria-labelledby='form-dialog-title' open={open}>
      <DialogTitle id='form-dialog-title'>{content.title}</DialogTitle>

      {content.content}

      <DialogActions style={{ marginRight: '20px', marginBottom: '20px' }}>
        <Button
          color='secondary'
          onClick={closeMovieLookup}
        >
            Cancel
        </Button>
        <Button
          color='primary'
          disabled={!validateButton()}
          onClick={content.buttonAction}
          variant='raised'
        >
          {content.button}
        </Button>
      </DialogActions>
    </Dialog>
  )
}


MovieLookupDialog.propTypes = {
  callbackFunction: PropTypes.func,
  closeMovieLookup: PropTypes.func.isRequired,
  copyID: PropTypes.string.isRequired,
  mode: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  selectedCopy: PropTypes.string.isRequired,
  selectedMovie: PropTypes.object.isRequired,
  setMode: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  mode: state.movieLookup.mode,
  open: state.movieLookup.open,
  selectedMovie: state.movieLookup.selectedMovie,
  selectedCopy: state.movieLookup.selectedCopy,
  callbackFunction: state.movieLookup.callbackFunction,
  copyID: state.movieLookup.copyID,
})


const actions = {
  ...movieLookupActions,
}

export default connect(mapStateToProps, actions)(MovieLookupDialog)
