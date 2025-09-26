---
sidebar_position: 3
title: Case Study
slug: project
---
# Case Study

This case study demonstrates an educational assessment system where teachers create test papers, students take examinations, and teachers evaluate student responses.

## Exploring the project

After setting up your environment, you can deploy this application directly to explore its functionality.

![](img/project_192638.png)

| Name | Account | Password | Role | Description |
|------|------|------|------|------|
| Admin | admin123 | admin123 | Administrator | System administrator with all permissions |
| Teacher A | jialaoshi | ls123456 | Teacher | Can create test papers and grade |
| Teacher B | yilaoshi | ls123456 | Teacher | Can create test papers and grade |
| Student A | kaoshenga | ks123456 | Student | Can take exams |
| Student B | kaoshengb | ks123456 | Student | Can take exams |

## Demo overview
### Teacher portal
import VideoPlayer from '@site/src/components/VideoPlayer';

<VideoPlayer relatePath="/docs/tutorial/project_teacher.mp4" />

### Student portal

<VideoPlayer relatePath="/docs/tutorial/project_student.mp4" />

### Administrator portal

<VideoPlayer relatePath="/docs/tutorial/project_admin.mp4" />

## Data model overview
* **Question Bank Table**: Stores comprehensive question information including content, type, difficulty level, and metadata
* **Test Paper Tables**: Store test paper configurations and question associations through main and detail tables
* **Answer Sheet Tables**: Store student responses and scoring information through main and detail tables

The detailed field structures are illustrated below:

![](img/project_102847.png)
![](img/project_102943.png)
![](img/project_103005.png)
![](img/project_103040.png)
![](img/project_103119.png)