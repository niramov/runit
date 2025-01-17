import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import Button from 'react-bootstrap/Button';
import { BoxArrowUp, Files, PlayFill } from 'react-bootstrap-icons';
import { actions } from '../../slices';
import { useAuth, useRunButton } from '../../hooks';

function ActionsToolbar({ snippet }) {
  const { t } = useTranslation();
  const { onClick, disabled } = useRunButton();
  const dispatch = useDispatch();
  const { snippetData, code } = snippet;
  const { name: snippetName, ownerUsername } = snippetData;
  const { isLoggedIn } = useAuth();

  const handleShare = () => {
    dispatch(
      actions.openModal({
        type: 'sharingSnippet',
        item: snippetData,
      }),
    );
  };

  const handleDuplicate = () => {
    if (isLoggedIn) {
      dispatch(
        actions.openModal({
          type: 'duplicateSnippet',
          item: {
            currSnippetName: snippetName,
            ownerUsername,
            code,
            shouldOpen: true,
          },
        }),
      );
    } else {
      dispatch(
        actions.openModal({
          type: 'signingIn',
        }),
      );
    }
  };

  return (
    <>
      <Button
        className="btn-icon-only-full-height"
        onClick={handleDuplicate}
        variant="nofill-body"
      >
        <Files />
      </Button>

      <Button
        className="btn-icon-only-full-height"
        onClick={handleShare}
        variant="nofill-body"
      >
        <BoxArrowUp />
        <span className="visually-hidden">{t('snippetActions.share')}</span>
      </Button>
      <Button
        className={`ms-3 btn-run${disabled ? ' running' : ''}`}
        disabled={disabled}
        onClick={onClick}
        variant="primary"
      >
        <PlayFill className="bi" />
        {t('snippetActions.run')}
      </Button>
    </>
  );
}

export default ActionsToolbar;
