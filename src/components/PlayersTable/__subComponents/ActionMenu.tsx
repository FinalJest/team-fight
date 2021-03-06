import React from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import { DeletePlayer } from '../../modals/player/DeletePlayer';
import { useReduxDispatch } from '../../../hooks/useReduxDispatch';
import { promotePlayer } from '../../../modules/teams/actions';
import { Position } from '../../../enums/Position';
import { EditPlayer } from '../../modals/player/EditPlayer';
import { RetirePlayer } from '../../modals/player/RetirePlayer';
import { MovePlayerToFreeMarket } from '../../modals/player/MoveToFreeMarketButton';

const ACTION_BUTTON_ID = 'action_button';
const ACTION_MENU_ID = 'action_menu';

interface ActionMenuProps {
    playerId: string;
    position: Position;

    teamId?: string;
    isSub?: boolean;
    isRetired?: boolean;
}

export const ActionMenu: React.FC<ActionMenuProps> = ({
    playerId,
    teamId,
    position,
    isSub,
    isRetired,
}) => {
    const [anchorElement, setAnchorElement] = React.useState<null | HTMLElement>(null);
    const isOpen = Boolean(anchorElement);
    const dispatch = useReduxDispatch();
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorElement(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorElement(null);
    };
    const handlePromote = () => {
        if (teamId !== undefined) {
            dispatch(promotePlayer(teamId, playerId, position));
        }
        handleClose();
    };

    return (
        <div>
            <Button
                id={ACTION_BUTTON_ID}
                aria-controls={isOpen ? ACTION_MENU_ID : undefined}
                aria-haspopup="true"
                aria-expanded={isOpen ? 'true' : undefined}
                onClick={handleClick}
            >
                ...
            </Button>
            <Menu
                id={ACTION_MENU_ID}
                anchorEl={anchorElement}
                open={isOpen}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': ACTION_BUTTON_ID,
                }}
            >
                {isSub && <MenuItem onClick={handlePromote}>To Main Team</MenuItem>}
                {teamId !== undefined && (
                    <MovePlayerToFreeMarket
                        ButtonComponent={MenuItem}
                        onClose={handleClose}
                        id={playerId}
                        teamId={teamId}
                    />
                )}
                {!isRetired && <EditPlayer ButtonComponent={MenuItem} onClose={handleClose} id={playerId} />}
                {!isRetired && <RetirePlayer ButtonComponent={MenuItem} onClose={handleClose} id={playerId} />}
                <DeletePlayer ButtonComponent={MenuItem} onClose={handleClose} id={playerId} />
            </Menu>
        </div>
    );
};
