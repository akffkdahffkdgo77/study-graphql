import { v4 as uuidv4 } from 'uuid';

import StudyImage from 'assets/images/study.png';
import VideoImage from 'assets/images/video.png';

export const todoList = {
    todoList: {
        data: [
            {
                id: uuidv4(),
                title: 'GraphQL 공부하기',
                description: '공식문서 정독하기',
                image: StudyImage,
                isCompleted: false,
                tag: 'GraphQL,Documentation'
            },
            {
                id: uuidv4(),
                title: 'GraphQL 공부하기',
                description: 'GraphQL 강의듣기',
                image: VideoImage,
                isCompleted: false,
                tag: 'GraphQL,Lecture,Video'
            }
        ],
        totalCount: 2
    }
};
