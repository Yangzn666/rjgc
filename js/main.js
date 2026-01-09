// 主页导航平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // 只对页面内锚点链接使用平滑滚动，不影响正常页面跳转链接
        if (this.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// 章节页面的知识点展开/折叠功能
document.addEventListener('DOMContentLoaded', function() {
    const topicTitles = document.querySelectorAll('.topic-title');
    
    topicTitles.forEach(title => {
        title.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const icon = this.querySelector('.toggle-icon');
            
            if (content) {
                content.classList.toggle('hidden');
                if (icon) {
                    icon.classList.toggle('rotated');
                }
            }
        });
    });
    
    // 为第8-12章的新结构添加展开/折叠功能
    const knowledgeHeaders = document.querySelectorAll('.knowledge-header');
    
    knowledgeHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const icon = this.querySelector('.fa-plus-circle');
            
            if (content) {
                content.classList.toggle('hidden');
                if (icon) {
                    icon.classList.toggle('rotated');
                }
            }
        });
    });
    
    // 如果在包含思维导图的页面，初始化思维导图
    if (document.getElementById('mindmap-container')) {
        initializeMindMap();
    }
});

// 初始化思维导图功能
function initializeMindMap() {
    // 为思维导图节点添加动画效果
    const branchNodes = document.querySelectorAll('.branch-node');
    
    // 为每个分支节点添加延迟动画
    branchNodes.forEach((node, index) => {
        // 设置不同的延迟时间，创造顺序出现的效果
        node.style.animationDelay = `${index * 0.2}s`;
        
        // 添加鼠标悬停效果
        node.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        node.addEventListener('mouseleave', function() {
            this.style.zIndex = 'auto';
        });
    });
    
    // 为中心节点添加点击效果
    const centralNode = document.querySelector('.central-node');
    if (centralNode) {
        centralNode.addEventListener('click', function() {
            // 可以添加中心节点的点击交互效果
            this.classList.add('pulse-border');
            setTimeout(() => {
                this.classList.remove('pulse-border');
            }, 2000);
        });
    }
    
    console.log("思维导图初始化完成");
}

// 图表点击放大功能
function openModal(imageSrc, altText) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <img src="${imageSrc}" alt="${altText}">
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // 关闭模态框
    const closeBtn = modal.querySelector('.close');
    closeBtn.onclick = function() {
        document.body.removeChild(modal);
    };
    
    // 点击模态框外部关闭
    modal.onclick = function(event) {
        if (event.target === modal) {
            document.body.removeChild(modal);
        }
    };
}

// 添加模态框样式到页面
function addModalStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .modal {
            display: block;
            position: fixed;
            z-index: 1001;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.8);
        }
        
        .modal-content {
            position: relative;
            background-color: transparent;
            margin: 5% auto;
            padding: 20px;
            width: 90%;
            max-width: 900px;
            text-align: center;
        }
        
        .modal-content img {
            max-width: 100%;
            max-height: 80vh;
            border-radius: 5px;
        }
        
        .close {
            color: white;
            position: absolute;
            top: -40px;
            right: 0;
            font-size: 35px;
            font-weight: bold;
            cursor: pointer;
        }
        
        .close:hover {
            color: #ccc;
        }
    `;
    
    document.head.appendChild(style);
}

// 页面加载时添加模态框样式
document.addEventListener('DOMContentLoaded', function() {
    addModalStyles();
});

// 防止事件冒泡影响链接点击
document.addEventListener('DOMContentLoaded', function() {
    const chapterCards = document.querySelectorAll('.chapter-card');
    chapterCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // 如果点击的是卡片本身而不是链接，则不做任何事情
            if (e.target.classList.contains('chapter-link')) {
                // 确保点击链接时不会被其他事件处理器阻止
                e.stopPropagation();
            }
        });
    });
});

// 回到顶部按钮
window.addEventListener('scroll', function() {
    const backToTop = document.getElementById('backToTop');
    if (window.pageYOffset > 300) {
        backToTop.style.display = 'block';
    } else {
        backToTop.style.display = 'none';
    }
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// 为测试页面添加交互功能
function checkAnswer(questionId, correctOption) {
    const selectedOption = document.querySelector(`input[name='${questionId}']:checked`);
    const feedbackElement = document.getElementById(`feedback-${questionId}`);
    
    if (selectedOption) {
        const selectedValue = selectedOption.id.slice(-1); // 获取选项字母 (a, b, c, d)
        if (selectedValue === correctOption) {
            feedbackElement.textContent = '正确！';
            feedbackElement.style.color = '#27ae60';
        } else {
            feedbackElement.textContent = '错误，请再试一次。';
            feedbackElement.style.color = '#e74c3c';
        }
    } else {
        feedbackElement.textContent = '请选择一个选项。';
        feedbackElement.style.color = '#f39c12';
    }
}

function checkFill(questionId, correctAnswers) {
    const inputElements = document.querySelectorAll('input.fill-blank');
    const inputElement = inputElements[parseInt(questionId) - 1]; // 获取对应的输入框
    const userAnswer = inputElement.value.trim().toLowerCase();
    const feedbackElement = document.getElementById(`feedback-fill${questionId}`);
    
    // 检查用户答案是否包含所有正确答案
    let isCorrect = true;
    for (let correctAnswer of correctAnswers) {
        if (!userAnswer.includes(correctAnswer.toLowerCase())) {
            isCorrect = false;
            break;
        }
    }
    
    if (isCorrect) {
        feedbackElement.textContent = '正确！';
        feedbackElement.style.color = '#27ae60';
    } else {
        feedbackElement.textContent = `不完全正确。正确答案应包含: ${correctAnswers.join(', ')}`;
        feedbackElement.style.color = '#e74c3c';
    }
}

function showModelAnswer(elementId, answerText) {
    const modelAnswerElement = document.getElementById(elementId);
    if (modelAnswerElement.style.display === 'none') {
        modelAnswerElement.textContent = answerText;
        modelAnswerElement.style.display = 'block';
    } else {
        modelAnswerElement.style.display = 'none';
    }
}

// 添加点击其他地方隐藏模态框的功能
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.remove();
    }
});

// 添加键盘事件支持（ESC关闭模态框）
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const modal = document.querySelector('.modal');
        if (modal) {
            modal.remove();
        }
    }
});

// 选择题正确答案映射
const correctAnswers = {
    q1: 'a',
    q2: 'b',
    q3: 'c',
    q4: 'd',
    q5: 'c'
};

// 选择题解析映射
const explanations = {
    q1: '软件工程的三要素是方法、工具和过程，这是软件工程的基本组成部分。',
    q2: '模块独立性追求的目标是低耦合、高内聚，这样可以提高模块的可维护性和可重用性。',
    q3: '软件测试的目的是尽可能多地发现程序中的错误，而不是证明程序没有错误。',
    q4: '在软件生命周期中，维护阶段占工作量比例最大，通常超过50%以上。',
    q5: '完善性维护占软件维护工作量比例最大，因为用户会不断提出功能增强的需求。'
};

// 选择题选项文本映射
const optionTexts = {
    q1: {
        a: 'A. 方法、工具、过程',
        b: 'B. 需求、设计、编码',
        c: 'C. 分析、设计、实现',
        d: 'D. 文档、程序、数据'
    },
    q2: {
        a: 'A. 高耦合、低内聚',
        b: 'B. 低耦合、高内聚',
        c: 'C. 高耦合、高内聚',
        d: 'D. 低耦合、低内聚'
    },
    q3: {
        a: 'A. 证明程序没有错误',
        b: 'B. 证明程序有错误',
        c: 'C. 尽可能多地发现程序中的错误',
        d: 'D. 修正程序中的错误'
    },
    q4: {
        a: 'A. 需求分析',
        b: 'B. 编码实现',
        c: 'C. 测试',
        d: 'D. 维护'
    },
    q5: {
        a: 'A. 改正性维护',
        b: 'B. 适应性维护',
        c: 'C. 完善性维护',
        d: 'D. 预防性维护'
    }
};

// 处理选项点击事件
function selectOption(element, questionId, optionId, optionText) {
    // 清除之前的选择
    const optionsList = element.parentElement.querySelectorAll('li');
    optionsList.forEach(option => {
        option.classList.remove('selected', 'correct', 'incorrect');
    });
    
    // 标记当前选择
    element.classList.add('selected');
    
    // 获取正确答案
    const correctOption = correctAnswers[questionId];
    const feedbackElement = document.getElementById(`feedback-${questionId}`);
    
    if (optionId === correctOption) {
        // 用户选择了正确答案
        element.classList.add('correct');
        feedbackElement.textContent = '正确！' + explanations[questionId];
        feedbackElement.style.color = '#27ae60';
    } else {
        // 用户选择了错误答案
        element.classList.add('incorrect');
        
        // 查找正确选项并添加正确样式
        const allOptions = element.parentElement.querySelectorAll('li');
        allOptions.forEach(opt => {
            // 检查是否是正确答案的选项
            if (opt.onclick) {
                const onclickStr = opt.onclick.toString();
                if (onclickStr.includes(`'${questionId}'`) && onclickStr.includes(`'${correctOption}'`)) {
                    opt.classList.add('correct');
                }
            }
        });
        
        feedbackElement.innerHTML = `错误！正确答案是：${optionTexts[questionId][correctOption]}<br>解析：${explanations[questionId]}`;
        feedbackElement.style.color = '#e74c3c';
    }
}