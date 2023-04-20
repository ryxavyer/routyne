import React, { useEffect, useState } from 'react'
import { Badge, Button, Card, CardContent, Divider, LinearProgress, Menu, Typography } from '@mui/material'
import { EventAvailable as WeeklyChallengesIcon } from '@mui/icons-material'

const WeeklyChallenges = ({ challenges }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)
    const progress = (current, goal) => Math.min(100, (current / goal) * 100)

    useEffect(() => {}, [challenges])

    const handleOpen = (e) => {
        setIsOpen(!isOpen)
        setAnchorEl(e.currentTarget)
    }

    return (
    <div>
        <Badge badgeContent={challenges.length} color="unread" sx={{ '& .MuiBadge-badge': { top: 10, right: 10 } }}>
        <Button title="Weekly Challenges" onClick={(e) => handleOpen(e)} sx={{ minWidth: '50px' }}>
            <WeeklyChallengesIcon sx={{ fontSize: '30px' }} />
        </Button>
        </Badge>
        <Menu
            open={isOpen}
            anchorEl={anchorEl}
            onClose={() => setIsOpen(false)}
            sx={{
                minWidth: '500px',
                maxWidth: '1500px',
                top: '10px',
                '& .MuiList-root': {
                paddingTop: '0px',
                paddingBottom: '0px',
                },
            }}
            >
            {Object.entries(challenges).map(([challengeText, attributes], index) => (
                <div key={`challenge_${index}_div`}>
                <Card key={`challenge_${index}_card`} sx={{ minWidth: '450px', paddingBottom: '4px' }}>
                    <CardContent key={`challenge_${index}_content`}>
                        <Typography sx={{ fontSize: '14px' }} key={`challenge_${index}_title`}>
                            {challengeText}
                        </Typography>
                        <Typography color="text.secondary" sx={{ fontSize: '12px', paddingBottom: '5px' }} key={`challenge_${index}_description`}>
                            {`${attributes.xp} XP`}
                        </Typography>
                        <LinearProgress
                            key={`challenge_${index}_progress`}
                            variant="determinate"
                            value={progress(attributes.progress, attributes.metric)}
                            sx={{ marginTop: '4px' }}
                        />
                        <Typography color="text.secondary" sx={{ fontSize: '12px', float: 'right', marginTop: '4px' }} key={`challenge_${index}_date`}>
                            {`${attributes.progress}/${attributes.metric}`}
                        </Typography>
                    </CardContent>
                </Card>
                {index !== Object.keys(challenges).length - 1 ? <Divider /> : ''}
                </div>
            ))}
            </Menu>
        </div>
        );
    };

export default WeeklyChallenges