import json
import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")  # Adjust 'backend.settings' to your project's settings path
django.setup()

from question import models

map = {
    "A" : "0",
    "B" : '1',
    'C' : '2',
    'D' : '3',
    'E' : '4',
    'F' : '5',
    'G' : '6',
    'H' : '7'
}


    
def create_module_subCategries(module_name, grade, data, wilaya):

    subCategoriesList = []
    for q in data: 
        subCategoriesList.append(q['subcategoryName'])

    module = models.Category.objects.create(name=module_name, grade=grade, location=wilaya)
    
    for subName in set(subCategoriesList):
        subCategory_name = subName

        models.SubCategory.objects.create(name=subName, category=module)
        print(f'{subCategory_name} - Done')



def create_question_choices(data):

    for i, q in enumerate(data):
        q_text = q['text']
        q_year = q['year']
        q_explanation = q['explanation']
        q_subCategory = models.SubCategory.objects.get(name=q['subcategoryName'])
        q_choices = []

        question = models.Question.objects.create(
            text=q_text,
            year=q_year,
            explanation=q_explanation,
            subCategory=q_subCategory
        )

        for c in q['suggestions']:
            c['isCorrect'] = False
            q_choices.append(c)

        for a in q['answers']:
            c = q_choices[int(map[a])]
            c['isCorrect'] = True
            q_choices[int(map[a])] = c

        for c in q_choices:
            choice = models.Choice.objects.create(
                text = c['text'],
                question=question,
                isCorrect = c['isCorrect'],
                
            )

        print(f'question - {i} - {q["id"]} - Done')



second_grade = models.Grade.objects.get(id=2)
wilaya = models.Wilaya.objects.get(id=1)


modules_2 = [
    # 'cardio',
    'digestif',
    'endocrinien',
    'immunologie',
    'neurologie',
    'urinaire'
]

for module in modules_2:
    with open(rf'A:\MCQ-data\Batna\2eme\answered\{module}.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    
        create_module_subCategries(module, second_grade, data, wilaya)
        create_question_choices(data)

        





