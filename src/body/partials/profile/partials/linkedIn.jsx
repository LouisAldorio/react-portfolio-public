import React from 'react'
import { useScript } from '../../../../customHooks/hooks';


function LinkedInBadge() {

    // useScript("https://platform.linkedin.com/badges/js/profile.js")

    return (
        <div className="badge-base LI-profile-badge" 
            data-locale="en_US" data-size="medium" 
            data-theme="light" data-type="HORIZONTAL" 
            data-vanity="louis-aldorio-3518851a6" data-version="v1">           
        </div>
    )
}

export default LinkedInBadge