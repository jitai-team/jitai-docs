---
sidebar_position: 3
title: Case Study
slug: project
---
# Case Study

This case study demonstrates an educational assessment system where examiners create test papers, examinees take examinations, and examiners evaluate examinee responses.

## Exploring the project

After setting up your environment, you can deploy this application directly to explore its functionality.

![](img/project_192638.png)

| Name | Account | Password | Role | Description |
|------|------|------|------|------|
| Admin | admin123 | admin123 | Administrator | System administrator with all permissions |
| Examiner1 | examiner1 | examiner1 | Examiner | Can create test papers and grade |
| Examiner2 | examiner2 | examiner2 | Examiner | Can create test papers and grade |
| Examinee1 | examinee1 | examinee1 | Examinee | Can take exams |
| Examinee2 | examinee2 | eaxminee2 | Examinee | Can take exams |

## Demo overview
### Examiner portal
import VideoPlayer from '@site/src/components/VideoPlayer';

<VideoPlayer relatePath="/docs/tutorial/en/project_examiner.mp4" />

### Examinee portal

<VideoPlayer relatePath="/docs/tutorial/en/project_examinee.mp4" />

### Administrator portal

<VideoPlayer relatePath="/docs/tutorial/en/project_admin.mp4" />

## Data model overview
* **Question Bank Table**: Stores comprehensive question information including content, type, difficulty level, and metadata
* **Test Paper Tables**: Store test paper configurations and question associations through main and detail tables
* **Answer Sheet Tables**: Store examinee responses and scoring information through main and detail tables

The detailed field structures are illustrated below:

![](img/project_102847.png)
![](img/project_102943.png)
![](img/project_103005.png)
![](img/project_103040.png)
![](img/project_103119.png)