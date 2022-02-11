// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React, {useEffect} from 'react';
import {CSSTransition} from 'react-transition-group';
import {FormattedMessage, useIntl} from 'react-intl';

import Constants from 'utils/constants';
import QuickInput from 'components/quick_input';

import {Animations, mapAnimationReasonToClass, PreparingWorkspacePageProps} from './steps';

import Title from './title';
import Description from './description';
import PageBody from './page_body';
import SingleColumnLayout from './single_column_layout';

import './channel.scss';

type Props = PreparingWorkspacePageProps & {
    name: string;
    onChange: (newValue: string) => void;
    className?: string;
}
const Channel = (props: Props) => {
    let className = 'Channel-body';
    if (props.className) {
        className += ' ' + props.className;
    }

    const intl = useIntl();
    useEffect(props.onPageView, []);

    const onNext = async (e?: React.KeyboardEvent | React.MouseEvent) => {
        if (e && (e as React.KeyboardEvent).key) {
            if ((e as React.KeyboardEvent).key !== Constants.KeyCodes.ENTER[0]) {
                return;
            }
        }
        props.next?.();
    };

    return (
        <CSSTransition
            in={props.show}
            timeout={Animations.PAGE_SLIDE}
            classNames={mapAnimationReasonToClass('Channel', props.direction)}
            mountOnEnter={true}
            unmountOnExit={true}
        >
            <div className={className}>
                <SingleColumnLayout>
                    {props.previous}
                    <Title>
                        <FormattedMessage
                            id={'onboarding_wizard.channel.title'}
                            defaultMessage='Let’s create your first channel'
                        />
                    </Title>
                    <Description>
                        <FormattedMessage
                            id={'onboarding_wizard.channel.description'}
                            defaultMessage='Channels are where you can communicate with your team about a topic or project. What are you working on right now?'
                        />
                    </Description>
                    <PageBody>
                        <QuickInput
                            value={props.name}
                            onChange={(e) => props.onChange(e.target.value)}
                            onKeyUp={onNext}
                            autoFocus={true}
                            className='Channel__input'
                            placeholder={intl.formatMessage({id: 'onboarding_wizard.channel.input', defaultMessage: 'Enter a channel name'})}
                        />
                    </PageBody>
                    <div>
                        <button
                            className='primary-button'
                            onClick={props.next}
                        >
                            <FormattedMessage
                                id={'onboarding_wizard.next'}
                                defaultMessage='Continue'
                            />
                        </button>
                        <button
                            className='tertiary-button'
                            onClick={props.skip}
                        >
                            <FormattedMessage
                                id={'onboarding_wizard.skip'}
                                defaultMessage='Skip for now'
                            />
                        </button>
                    </div>
                </SingleColumnLayout>
            </div>
        </CSSTransition>
    );
};

export default Channel;
