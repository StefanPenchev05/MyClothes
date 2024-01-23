import React from 'react'
import { Typography, Card as MaterialCard, CardContent, CardHeader, Avatar, IconButton, LinearProgress  } from '@mui/material';
import { Email } from '@mui/icons-material';

interface CardTypes{
    name: string,
    avatar: string,
    title: string,
    experience: string,
    email: string,
    languages: {
        language: string,
        level: number,
        experience: number,
    }[],
    bio: string
}

function handleEmailClick(email:string) {
    console.log('email clicked for ' + email)
}

function getProficiencyLabel(level: number) {
    if(level < 25) {
        return 'Begginer'
    } else if(level < 60) {
        return 'Intermetiate'
    } else if(level < 85) {
        return 'Advanced'
    } else {
        return 'Expert'
    }
}

function getProgressColor(level: number) {
    if (level < 25) {
        return 'secondary'; // begginer
      } else if (level < 60) {
        return 'warning'; // intermediate
      } else if (level < 85) {
        return 'success'; // advanced
      } else {
        return 'error'; // expert
      }
}

function yearsToMonths(years: number) {
    if(years < 1){
        return Math.ceil(years * 12) + ' months'
    }else if(years === 1){
        return years + ' year'
    }else{
        return years + ' years'
    }
}

function Card({name, avatar, bio,title, experience, email, languages}: CardTypes) {
  return (
    <MaterialCard className='w-1/3'>
        <CardHeader
            avatar= {
                <Avatar
                    src={avatar}
                    sx={{width:80, height:80}}
                />
            }
            title={title}
            subheader={experience}
            action={
                <IconButton aria-label="settings" onClick={() => handleEmailClick(email)}>
                    <Email />
                </IconButton>
            }
        />
        <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                {name}
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={6} height={60}>
                {bio}
            </Typography>
            {languages.map((lang) => (
                <div key={lang.language} className='mb-4'>
                    <Typography variant="subtitle1" color="text.secondary" fontWeight={"bold"} mb={1}>
                        {lang.language} - {getProficiencyLabel(lang.level)} - {yearsToMonths(lang.experience)}
                    </Typography>
                    <div className='w-full flex justify-between'>
                        <Typography variant="body2" color="text.secondary">
                            Begginer
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Intermetiate
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Advanced
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Expert
                        </Typography>
                    </div>
                    <LinearProgress variant="determinate" value={lang.level} color={getProgressColor(lang.level)} sx={{height:10, borderRadius:8}} />
                </div>
            ))}
        </CardContent>
    </MaterialCard>
  )
}

export default Card