import React, { useState } from 'react';
import styles from '../../styles/Home.module.css';
import LinksContainer from './LinksContainer';
import moment from 'moment';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Tooltip from '@mui/material/Tooltip';
import EntryExcludedSnackbar from '../MUI/EntryExcludedSnackbar';

interface CardContentsProps {
  i2: number;
  currentKey: string;
  currentValue: string | number;
  excludeEntry: Function;
  currentTitle: string;
}

export default function CardContents({
  i2,
  currentKey,
  currentValue,
  excludeEntry,
  currentTitle,
}: CardContentsProps) {
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleClick = () => {
    setOpenSnackbar(true);
  };

  const closeSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };
  return (
    <div key={'2' + i2}>
      {currentKey === 'coverImage' ? (
        <div className={styles.coverImageContainer}>
          <img
            className={styles.coverImage}
            src={currentValue}
            alt='Cover Image'
          />
        </div>
      ) : currentKey === 'links' ? (
        <LinksContainer currentValue={currentValue} />
      ) : currentKey === 'canonicity' ? null : (
        <h2>{currentKey.replace(/([A-Z])/g, ' $1')}:</h2>
      )}

      {typeof currentValue === 'string' && currentKey !== 'coverImage' ? (
        <p>{currentValue.replace(/—/g, '-')}</p>
      ) : null}

      {typeof currentValue === 'number' &&
      currentKey !== 'timeline' &&
      currentKey !== 'coverImage' ? (
        <p>{currentValue}</p>
      ) : null}

      {currentKey === 'releaseDate' && moment(currentValue).isValid() ? (
        <p>
          {moment(currentValue)._d.toDateString().split(' ').slice(1).join(' ')}
        </p>
      ) : null}
      {currentKey === 'timeline' && currentValue > 0 ? (
        <p>{Math.abs(currentValue).toLocaleString('en')} ABY</p>
      ) : null}
      {currentKey === 'timeline' && currentValue <= 0 ? (
        <p>{Math.abs(currentValue).toLocaleString('en')} BBY</p>
      ) : null}
      {currentKey === 'timeline' && currentValue === '' ? <p>N/A</p> : null}
      {currentKey === 'canonicity' ? (
        currentValue ? (
          <div className={styles.canonDiv}>
            <h3 className={styles.canon}>Canon</h3>
            <Tooltip title='Exclude'>
              <HighlightOffIcon
                sx={{
                  position: 'absolute',
                  top: '0%',
                  left: '100%',
                  transform: 'translate(-50%, -50%)',
                  color: 'white',
                  backgroundColor: 'black',
                  borderRadius: '50%',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  excludeEntry(currentTitle);
                  handleClick();
                }}
              />
            </Tooltip>
            <EntryExcludedSnackbar
              openSnackbar={openSnackbar}
              closeSnackbar={closeSnackbar}
            />
          </div>
        ) : (
          <div className={styles.legendsDiv}>
            <h3 className={styles.legends}>Legends</h3>
            <Tooltip title='Exclude'>
              <HighlightOffIcon
                sx={{
                  position: 'absolute',
                  top: '0%',
                  left: '100%',
                  transform: 'translate(-50%, -50%)',
                  color: '#ffe81f',
                  backgroundColor: 'black',
                  borderRadius: '50%',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  excludeEntry(currentTitle);
                  handleClick();
                }}
              />
            </Tooltip>
            <EntryExcludedSnackbar
              openSnackbar={openSnackbar}
              closeSnackbar={closeSnackbar}
            />
          </div>
        )
      ) : null}
    </div>
  );
}