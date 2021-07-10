import React, { useMemo } from 'react';
import { animated, useTransition } from 'react-spring';
import { useSelector, useDispatch } from 'react-redux';
import { Store, actions } from '../../redux';
import { MessageHubSpring, MessageTimout } from '../../config';
import { MdClose } from 'react-icons/md';

const MessageHub: React.FC = () => {
    const { messages } = useSelector((store: Store) => store.global);
    const dispatch = useDispatch();
    const refMap = useMemo(() => new WeakMap(), [])
    const cancelMap = useMemo(() => new WeakMap(), [])
    
    const transitions = useTransition(messages, {
        from: { opacity: 0, height: 0, life: '100%' },
        keys: (item) => item.key,
        enter: item => async (next, cancel) => {
            cancelMap.set(item, cancel)
            await next({ opacity: 1, height: refMap.get(item).offsetHeight })
            await next({ life: '0%' })
        },
        leave: [{ opacity: 0 }, { height: 0 }],
        onRest: (result, ctrl, item) => {
            dispatch(actions.global.popMessage(item.key));
        },
        config: (item, index, phase) => key => (phase === 'enter' && key === 'life' ? { duration: MessageTimout } : MessageHubSpring),
    });

    return (
        <div className="messageHub-container">
            {transitions(({ life, ...style }, item) => (
                <animated.div className="messageHub-message" style={style}>
                    <div
                        className="messageHub-content"
                        ref={(ref: HTMLDivElement) => ref && refMap.set(item, ref)}
                    >
                        <animated.div className="messageHub-life" style={{ right: life }} />
                        <p>{item.message}</p>
                        <button
                            className="messageHub-button"
                            onClick={(e) => {
                                e.stopPropagation()
                                if (cancelMap.has(item)) cancelMap.get(item)()
                            }}
                        >
                            <MdClose size={18} />
                        </button>
                    </div>
                </animated.div>
            ))}
        </div>
    );
};

export default MessageHub;
