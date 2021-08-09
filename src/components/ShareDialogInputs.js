import React, { useState } from 'react';
import {
  Container,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@material-ui/core';

export default function ShareDialogInputs(props) {
  const { getShareInputContents } = props;
  const [inviteeSelections, setInviteeSelections] = useState({
    user: '',
    userAccess: 'read',
  });

  const handleTextChange = (evt) => {
    setInviteeSelections({
      ...inviteeSelections,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleRadioChange = (evt) => {
    setInviteeSelections({
      ...inviteeSelections,
      userAccess: evt.target.value,
    });
  };

  return (
    <Container>
      <TextField
        autoFocus
        id='user'
        label='User'
        name='user'
        required
        variant='outlined'
        value={inviteeSelections.user}
        onChange={handleTextChange}
        fullWidth
      />

      <FormControl component='fieldset'>
        <RadioGroup
          row
          aria-label='position'
          name='position'
          onChange={handleRadioChange}
          value={inviteeSelections.userAccess}
        >
          <FormControlLabel
            control={<Radio color='primary' />}
            label='Admin'
            labelPlacement='bottom'
            name='admin'
            value='admin'
          />
          <FormControlLabel
            value='readWrite'
            control={<Radio color='primary' />}
            label='View and Add/Delete'
            labelPlacement='bottom'
            name='readWrite'
            value='readWrite'
          />
          <FormControlLabel
            value='read'
            control={<Radio color='primary' />}
            label='View Only'
            labelPlacement='bottom'
            name='read'
            value='read'
          />
        </RadioGroup>
      </FormControl>
    </Container>
  );
}
