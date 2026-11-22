# Content Schema — English Learning Studio
Note: the delivered app runs on the Muse artifact stack (React + server actions + its own database), not Next.js/Prisma/PostgreSQL. This schema is the logical model the artifact's data must satisfy, and the target model for a future Next.js/Prisma migration. Do not claim Prisma migrations exist for the artifact.

## Entities (logical)
- Lesson { id: 1..125 stable, titleEn, titleBn, category, description, objectives[], estimatedMinutes, status: draft | review | published }
- VocabularyEntry { id, lessonId, type: word | phrase | sentence, textEn, textBn, partOfSpeech?, ipa?, definitionEn, explanationBn, difficulty, order }
- VocabularySense { entryId, senseIndex, meaningBn, definitionEn } — synonyms/antonyms link to a sense, not to a spelling.
- VocabularyRelation { fromSenseId, toText, relation: synonym | antonym | alternative, meaningBn } — antonym only where a true antonym exists; otherwise the entry shows "No natural antonym for this meaning." For phrases, use alternative expressions, not forced synonyms.
- ExampleSentence { entryId, textEn, textBn, order }
- MicroStory { entryId, titleEn, titleBn, sentences: [{ en, bn, order }], type: story | dialogue }
- LessonStory { lessonId, titleEn, titleBn, sentences: [{ en, bn, order }], comprehensionQuestions: [{ qEn, qBn, options[], answerIndex }] }
- Exercise { lessonId, kind: matching | memory | tictactoe | listening | spelling | sentence-builder | synonym | antonym | fill-blank | comprehension, questions derived from lesson entries }
- LessonProgress { lessonId, status: not-started | in-progress | completed | revision-needed, percent, bestQuizScore, lastStudiedAt }
- VocabularyReviewState { entryId, state: new | learning | review | mastered, ease, intervalDays, dueAt, lastGrade }
- ReviewHistory { entryId, grade, answeredAt }
- Bookmark / PersonalNote { entryId, note, savedAt }
- StudySession { date, minutes, lessonsStudied, wordsStudied }
- ContentReview { lessonId, entryCount, withBn, withExample, withMicroStory, storyPresent, storyTranslationCoverage, quizPresent, errors[], publicationStatus }

## Rules
- Every published entry: textEn, textBn, type, at least one example, micro-story or dialogue, at least one activity.
- Every published lesson: description, objectives, vocabulary collection, primary bilingual story, quiz, at least one interactive activity.
- Word / phrase / sentence get different UI: word = meaning + POS + synonyms/antonyms + story; phrase = meaning + usage + alternative + dialogue; sentence = translation + pattern (e.g. "My name is + [Name]") + word breakdown + dialogue.
- No entry may share another entry's micro-story. No lesson may share another lesson's story with nouns swapped.
- Bengali must be natural Bangladeshi Bengali, not literal translation. English examples must be grammatically correct beginner English.
