// محتوى النصوص لكل موضوع
const contentTypes = {
    general: {
        sentences: [
            'في عالم متسارع التطور، يبرز الإبداع كعنصر أساسي في تشكيل مستقبلنا.',
            'تتجلى قوة الفكر الإنساني في قدرته على تخطي الحدود وابتكار حلول جديدة.',
            'يشهد العصر الحديث تحولات جذرية في مختلف مجالات الحياة.',
            'الثقافة العربية غنية بتراثها وتاريخها العريق الذي يمتد لآلاف السنين.',
            'التنوع الثقافي يشكل مصدراً للإلهام والإبداع في المجتمعات الحديثة.'
        ]
    },
    tech: {
        sentences: [
            'يغير الذكاء الاصطناعي طريقة تفاعلنا مع التكنولوجيا بشكل جذري.',
            'تعد البيانات الضخمة محركاً أساسياً للابتكار في العصر الرقمي.',
            'الأمن السيبراني أصبح ضرورة حتمية في ظل التحول الرقمي المتسارع.',
            'تفتح تقنيات الواقع المعزز آفاقاً جديدة في مجال التعليم والتدريب.',
            'تعزز تقنيات البلوكتشين الشفافية والأمان في المعاملات الرقمية.'
        ]
    },
    marketing: {
        sentences: [
            'يعتبر التسويق الرقمي ركيزة أساسية في نجاح الأعمال المعاصرة.',
            'تساهم وسائل التواصل الاجتماعي في تغيير مشهد التسويق العالمي.',
            'يعد تحليل سلوك المستهلك أساساً لبناء استراتيجيات تسويقية ناجحة.',
            'التسويق بالمحتوى يخلق علاقة قوية ومستدامة مع العملاء.',
            'أصبح التسويق عبر المؤثرين ظاهرة رئيسية في عالم التجارة الإلكترونية.'
        ]
    },
    education: {
        sentences: [
            'يشكل التعليم المستمر حجر الأساس في تطوير المهارات المهنية.',
            'تغير التكنولوجيا الحديثة أساليب التعليم وطرق اكتساب المعرفة.',
            'يعزز التعلم التفاعلي فهم الطلاب واستيعابهم للمواد الدراسية.',
            'تساهم المنصات التعليمية الرقمية في توسيع نطاق الوصول إلى المعرفة.',
            'يعد التعليم عن بعد خياراً استراتيجياً في عصر التحول الرقمي.'
        ]
    },
    health: {
        sentences: [
            'تعد الصحة النفسية جزءاً أساسياً من الصحة العامة للإنسان.',
            'يساهم النظام الغذائي المتوازن في تعزيز المناعة وصحة الجسم.',
            'تلعب الرياضة دوراً محورياً في الحفاظ على اللياقة البدنية والصحة العامة.',
            'يعتبر النوم الكافي ضرورياً للحفاظ على الصحة الجسدية والعقلية.',
            'تساعد التقنيات الحديثة في تحسين جودة الرعاية الصحية وكفاءتها.'
        ]
    },
    history: {
        sentences: [
            'يعكس التاريخ العربي عمق الحضارة وثراء التراث الثقافي.',
            'شكلت الاكتشافات العلمية نقطة تحول في تاريخ البشرية.',
            'تروي المعالم التاريخية قصص الحضارات القديمة وإنجازاتها.',
            'يساهم فهم التاريخ في تشكيل رؤية أفضل للمستقبل.',
            'تعد دراسة التاريخ مصدراً مهماً للعبر والدروس المستفادة.'
        ]
    }
};

// دالة لتوليد نص عشوائي
function generateText(type, contentType, count) {
    const texts = contentTypes[contentType] || contentTypes.general;
    
    if (type === 'sentences') {
        const sentences = [];
        const usedIndexes = new Set();
        
        for (let i = 0; i < count; i++) {
            let randomIndex;
            do {
                randomIndex = Math.floor(Math.random() * texts.sentences.length);
            } while (usedIndexes.has(randomIndex) && usedIndexes.size < texts.sentences.length);
            
            usedIndexes.add(randomIndex);
            sentences.push(texts.sentences[randomIndex]);
            
            if (usedIndexes.size === texts.sentences.length) {
                usedIndexes.clear();
            }
        }
        return sentences.join(' ');
    }
    
    // فقرات
    const paragraphs = [];
    const usedSentences = new Set();
    
    for (let i = 0; i < count; i++) {
        const sentenceCount = Math.floor(Math.random() * 2) + 3;
        const paragraph = [];
        
        for (let j = 0; j < sentenceCount; j++) {
            let randomIndex;
            do {
                randomIndex = Math.floor(Math.random() * texts.sentences.length);
            } while (usedSentences.has(randomIndex) && usedSentences.size < texts.sentences.length);
            
            usedSentences.add(randomIndex);
            paragraph.push(texts.sentences[randomIndex]);
            
            if (usedSentences.size === texts.sentences.length) {
                usedSentences.clear();
            }
        }
        paragraphs.push(`<p style="text-indent: 20px; margin: 0; padding: 0.8em 0;">${paragraph.join(' ')}</p>`);
    }
    return paragraphs.join('\n');
}

// تهيئة عناصر الصفحة
document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate');
    const copyBtn = document.getElementById('copy');
    const countInput = document.getElementById('count');
    const counterLabel = countInput.parentElement.previousElementSibling;
    const decreaseBtn = document.querySelector('.decrease');
    const increaseBtn = document.querySelector('.increase');
    const textTypeInputs = document.querySelectorAll('input[name="textType"]');
    let resultContainer = null;
    let output = null;

    // تحديث عنوان العداد عند تغيير نوع النص
    textTypeInputs.forEach(input => {
        input.addEventListener('change', () => {
            counterLabel.textContent = input.value === 'paragraphs' ? 'عدد الفقرات' : 'عدد الجمل';
        });
    });

    // إنشاء حاوية النتيجة
    function createResultContainer() {
        if (!resultContainer) {
            resultContainer = document.createElement('div');
            resultContainer.className = 'result';
            output = document.createElement('div');
            output.id = 'output';
            resultContainer.appendChild(output);
            document.querySelector('.container').appendChild(resultContainer);
        }
        return output;
    }

    // زر التوليد
    generateBtn.addEventListener('click', () => {
        const type = document.querySelector('input[name="textType"]:checked').value;
        const contentType = document.getElementById('contentType').value;
        const count = parseInt(countInput.value);
        
        output = createResultContainer();
        const generatedText = generateText(type, contentType, count);
        
        if (type === 'paragraphs') {
            output.innerHTML = generatedText;
        } else {
            output.textContent = generatedText;
        }
        
        resultContainer.classList.add('visible');
    });

    // زر النسخ
    copyBtn.addEventListener('click', async () => {
        if (output && output.textContent) {
            try {
                // تحويل النص إلى تنسيق منظم مع مسافات وأسطر جديدة
                const formattedText = output.innerText
                    .split('\n')
                    .map(line => line.trim())
                    .filter(line => line)
                    .join('\n\n');
                
                await navigator.clipboard.writeText(formattedText);
                copyBtn.textContent = 'تم النسخ!';
                setTimeout(() => {
                    copyBtn.textContent = 'نسخ';
                }, 2000);
            } catch (err) {
                console.error('فشل النسخ:', err);
            }
        }
    });

    // أزرار زيادة ونقصان العدد
    decreaseBtn.addEventListener('click', () => {
        if (countInput.value > 1) {
            countInput.value = parseInt(countInput.value) - 1;
        }
    });

    increaseBtn.addEventListener('click', () => {
        if (countInput.value < 50) {
            countInput.value = parseInt(countInput.value) + 1;
        }
    });
});
