import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import { openModal } from 'flavours/glitch/actions/modal';
import { identityContextPropShape, withIdentity } from 'flavours/glitch/identity_context';
import { domain, version, source_url, statusPageUrl, profile_directory as profileDirectory } from 'flavours/glitch/initial_state';
import { PERMISSION_INVITE_USERS } from 'flavours/glitch/permissions';
import { logOut } from 'flavours/glitch/utils/log_out';

const messages = defineMessages({
  logoutMessage: { id: 'confirmations.logout.message', defaultMessage: 'Are you sure you want to log out?' },
  logoutConfirm: { id: 'confirmations.logout.confirm', defaultMessage: 'Log out' },
});

const mapDispatchToProps = (dispatch, { intl }) => ({
  onLogout () {
    dispatch(openModal({
      modalType: 'CONFIRM',
      modalProps: {
        message: intl.formatMessage(messages.logoutMessage),
        confirm: intl.formatMessage(messages.logoutConfirm),
        closeWhenConfirm: false,
        onConfirm: () => logOut(),
      },
    }));
  },
});

class LinkFooter extends PureComponent {
  static propTypes = {
    identity: identityContextPropShape,
    multiColumn: PropTypes.bool,
    onLogout: PropTypes.func.isRequired,
    intl: PropTypes.object.isRequired,
  };

  handleLogoutClick = e => {
    e.preventDefault();
    e.stopPropagation();

    this.props.onLogout();

    return false;
  };

  render () {
    const { signedIn, permissions } = this.props.identity;
    const { multiColumn } = this.props;

    const canInvite = signedIn && ((permissions & PERMISSION_INVITE_USERS) === PERMISSION_INVITE_USERS);
    const canProfileDirectory = profileDirectory;

    const DividingCircle = <span aria-hidden>{' · '}</span>;

    return (
      <div className='link-footer'>
        <p>
          <strong>Masto-FE-standalone</strong>
          {DividingCircle}
          <Link to='/keyboard-shortcuts'><FormattedMessage id='footer.keyboard_shortcuts' defaultMessage='Keyboard shortcuts' /></Link>
          {DividingCircle}
          <a href={source_url} rel='noopener noreferrer' target='_blank'><FormattedMessage id='footer.source_code' defaultMessage='View source code' /></a>
          {DividingCircle}
          <span className='version'>v{version}</span>
        </p>
      </div>
    );
  }

}

export default injectIntl(withIdentity(connect(null, mapDispatchToProps)(LinkFooter)));
