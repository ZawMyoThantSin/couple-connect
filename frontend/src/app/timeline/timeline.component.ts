import { Component } from '@angular/core';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent {
  timelineEvents = [
    { id: 1, date: 'June 15, 2023', title: 'First Date', icon: 'heart', color: 'text-love-red' },
    { id: 2, date: 'July 4, 2023', title: 'First Kiss', icon: 'star', color: 'text-love-pink' },
    { id: 3, date: 'August 20, 2023', title: 'Concert Night', icon: 'music', color: 'text-love-purple' },
    { id: 4, date: 'September 10, 2023', title: 'Weekend Getaway', icon: 'camera', color: 'text-love-pink' },
    { id: 5, date: 'October 31, 2023', title: 'Halloween Party', icon: 'calendar', color: 'text-love-purple' },
  ];
}
