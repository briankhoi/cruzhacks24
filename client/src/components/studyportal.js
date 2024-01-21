import './studyportal.scss';
import { Card } from 'flowbite-react';

export default function StudyPortal() {
    return (
        <div className="portal bg-gray-100 p-4">
          <h1 className="title text-gray-800 text-2xl mb-4">Study</h1>
          <div class="card">
            <div class="header">
                <img alt="#" src="https://cdn.discordapp.com/attachments/974855529962819664/1198561652057067630/pexels-karolina-grabowska-4195327.jpg?ex=65bf5a86&is=65ace586&hm=65232c9bded8aee290b210e72b39a8b1ac873b6b967f412fe39d6e9cf04d8854&"/>
            </div>
            <div class="footer font-bold tracking-tight text-gray-900 dark:text-white">My Notes</div>
            <div class="footer-description">View your flashcards and test questions!</div>
          </div>
        <div class="mb-4"></div>
          <div class="card">
            <div class="header">
                <img alt="#" src="https://assets-global.website-files.com/640e63e70c1c77711e52d68b/64215fa40c33f7d09cdd71ad_Highlight%2003.png"/>
            </div>
            <div class="footer font-bold tracking-tight text-gray-900 dark:text-white">Generate</div>
            <div class="footer-description">Use AI to create review materials!</div>
          </div>
        </div>
      );
}