import { Component } from '@angular/core';
import { NavbarComponent } from '../../../../components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { MediumSelectDialogComponent } from '../../../../components/medium-select-dialog/medium-select-dialog.component';

@Component({
  selector: 'app-campaigns',
  standalone: true,
  imports: [NavbarComponent, CommonModule, RouterModule, MediumSelectDialogComponent],
  templateUrl: './campaigns.component.html',
  styleUrl: './campaigns.component.css'
})
export class CampaignsComponent {
  CampaignsList = [
    {
      "title": "Lohri celebration",
      "img": "https://www.euroschoolindia.com/wp-content/uploads/2024/01/lohri-stories-jpg.webp",
      "description": "We are going to celebrate Lohri, so there will be an occasional leave for it. Happy Lohri to all."
    },
    {
      "title": "Maths Exam Delayed",
      "img": "https://img.jagranjosh.com/imported/images/E/Articles/maths2.jpg",
      "description": "The Math exam scheduled for tomorrow has been delayed. The new date will be announced soon."
    },
    {
      "title": "Course Inauguration Postponed",
      "img": "https://cdn.elearningindustry.com/wp-content/uploads/2015/02/launching-your-elearning-course-15-things-to-double-check.jpg",
      "description": "The inauguration of the new course has been postponed. We will inform you of the new date shortly."
    },
    {
      "title": "Science Fair Announcement",
      "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHNR1R5iJvj8HmBY3ZvviL8wadsnZkER3GVQ&s",
      "description": "Get ready for the annual Science Fair! Start preparing your projects and stay tuned for more details."
    },
    {
      "title": "Guest Lecture on AI",
      "img": "https://img.brainkart.com/subject/144.jpg",
      "description": "We are excited to announce a guest lecture on Artificial Intelligence next week. Don't miss it!"
    },
    {
      "title": "Sports Day Event",
      "img": "https://i.pinimg.com/736x/fe/10/5e/fe105ee75ce11a8bd283dd2fc86f1178.jpg",
      "description": "Join us for the annual Sports Day event. Participate in various sports and win exciting prizes."
    },
    {
      "title": "Diwali Festivities",
      "img": "https://images.news18.com/ibnlive/uploads/2023/11/white-background-71-2023-11-6cefd891c43595e18a47a8ccb7c64e3d.jpg?impolicy=website&width=640&height=480",
      "description": "Join us for the Diwali celebrations with lights, sweets, and fireworks. Enjoy the festivities!"
    },
    {
      "title": "Christmas Party",
      "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXFLJvZvYqfpPey8uHpYt3YqvBo3s9rdibuw&s",
      "description": "Come and celebrate the joy of Christmas with us. Don't miss out on the holiday cheer and festivities."
    },
    {
      "title": "New Year Bash",
      "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2y6c3LS9Tk9UeuQzi-3mvS-8w1vgUrjIEUQ&s",
      "description": "Ring in the New Year with a grand celebration. Let's welcome the new beginnings together."
    },
    {
      "title": "Holi Festival",
      "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaWKV3ybDWg0mTfAhGqUC9ElxkGoteQ3N4ZQ&s",
      "description": "Celebrate the festival of colors with us. Enjoy the vibrant hues and joyous atmosphere."
    },
    {
      "title": "Independence Day",
      "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrZ0_KLYDR9xwvwQQJu2-OOP5kefuOcbuJcg&s",
      "description": "Commemorate Independence Day with us. Let's honor the freedom and unity of our nation."
    },
    {
      "title": "Eid Celebration",
      "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf1uQ0jRidUFkavCRUPUIDabqGXvLNfbDdnQ&s",
      "description": "Join us in celebrating Eid with feasts and festivities. Eid Mubarak to all!"
    },
    {
      "title": "Thanksgiving Feast",
      "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8LeNrY2TeptIghtTPibilXfK31ANXj4dCLQ&s",
      "description": "Gather around for a Thanksgiving feast. Let's give thanks and celebrate together."
    },
    {
      "title": "Valentine's Day",
      "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5NZhuYAJQ75AQp-K7P6BtRBcXSQSbkYqESQ&s",
      "description": "Celebrate love and friendship this Valentine's Day. Join us for a day filled with love and joy."
    },
    {
      "title": "Ganesh Chaturthi",
      "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaXaN1ZHOfcre_QNZyVKTvG-nLeLKB64fQuQ&s",
      "description": "Celebrate Ganesh Chaturthi with us. Let's welcome Lord Ganesha with devotion and joy."
    }
  ]
  selectedCampaign: any = null;

  onCampaignClick(Campaign: any) {
    this.selectedCampaign = Campaign;
  }

  closeDialog() {
    this.selectedCampaign = null;
  }
}
