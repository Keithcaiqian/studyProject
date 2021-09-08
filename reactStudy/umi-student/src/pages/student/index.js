import React from 'react'
import StudentLoadingContainer from './_containers/StudentLoadingContainer'
import StudentSearchBarContainer from './_containers/StudentSearchBarContainer'
import StudentTableContainer from './_containers/StudentTableContainer'
import PagerContainers from './_containers/PagerContainers'

export default function index() {
    return (
        <div>
            <StudentSearchBarContainer />
            <StudentTableContainer />
            <PagerContainers />
            <StudentLoadingContainer />
        </div>
    )
}
