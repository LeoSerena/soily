import Head from 'next/head'

import ToolBar from './Toolbar';

export default function HeaderComponent(){
    return (
        <div className='header'>        
            <Head>
                <title>Soil</title>
            </Head>
            <ToolBar/>
        </div>
    )
}