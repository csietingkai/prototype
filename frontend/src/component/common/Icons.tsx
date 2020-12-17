import * as React from 'react';
import { library } from '@fortawesome/fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faAngleDown, faAngleUp, faBoxes, faImages, faListUl, faLock, faSignInAlt, faSignOutAlt, faTachometerAlt, faTextHeight, faTint, faUser } from '@fortawesome/fontawesome-free-solid';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

library.add(faAddressCard, faAngleUp, faAngleDown, faBoxes, faImages, faListUl, faLock, faSignInAlt, faSignOutAlt, faTachometerAlt, faTextHeight, faTint, faUser);

const Icon = (icon: IconProp) => () => <span className='icon'><FontAwesomeIcon icon={icon} /></span>;
export const AddressCardIcon = Icon('address-card');
export const AngleDownIcon = Icon('angle-down');
export const AngleUpIcon = Icon('angle-up');
export const BoxesIcon = Icon('boxes');
export const ImagesIcon = Icon('images');
export const ListUlIcon = Icon('list-ul');
export const LockIcon = Icon('lock');
export const SignInAltIcon = Icon('sign-in-alt');
export const SignOutAltIcon = Icon('sign-out-alt');
export const TachometerAltIcon = Icon('tachometer-alt');
export const TextHeightIcon = Icon('text-height');
export const TintIcon = Icon('tint');
export const UserIcon = Icon('user');
