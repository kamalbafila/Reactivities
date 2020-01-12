import React from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'

export const LoadingComponent:React.FC<{inverted?:Boolean,content?:String}> = ({
    inverted =true,
    content
}) => {
        return (
            <Dimmer active inverted={inverted}>
                <Loader content={content} />
            </Dimmer>
        )
};
