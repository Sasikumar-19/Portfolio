import sys

with open('style.css', 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
for i, line in enumerate(lines):
    line_num = i + 1
    
    if 63 <= line_num <= 103:
        continue
    if 330 <= line_num <= 368:
        continue
    if 425 <= line_num <= 540:
        continue
    if line_num == 1271:
        continue
        
    if line_num >= 829:
        line = line.replace('var(--text-1)', 'var(--text-primary)')
        line = line.replace('var(--text-2)', 'var(--text-secondary)')
        
    if line_num == 23:
        overrides = """[data-theme="light"] .glass-panel {
    background: rgba(255, 255, 255, 0.7);
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
}

[data-theme="light"] .status-pill {
    background: rgba(14, 165, 233, 0.08);
    border-color: rgba(14, 165, 233, 0.2);
}

[data-theme="light"] .project-tab-btn {
    background: rgba(0, 0, 0, 0.04);
    border-color: rgba(0, 0, 0, 0.1);
    color: var(--text-secondary);
}

[data-theme="light"] .project-tab-btn:hover {
    background: rgba(0, 0, 0, 0.08);
    color: var(--text-primary);
}

[data-theme="light"] .project-tab-btn.active {
    background: var(--accent-1);
    color: #fff;
    border-color: var(--accent-1);
}

[data-theme="light"] .tech-tag {
    background: rgba(0, 0, 0, 0.04);
    border-color: rgba(0, 0, 0, 0.1);
}

[data-theme="light"] .btn-github-action {
    color: var(--text-primary);
    border-color: rgba(0, 0, 0, 0.2);
}

[data-theme="light"] .btn-github-action:hover {
    background: rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.3);
}

[data-theme="light"] .navbar {
    background: rgba(248, 250, 252, 0.85);
}

[data-theme="light"] .nav-links.active {
    background: rgba(248, 250, 252, 0.98);
}

[data-theme="light"] .contact-form input,
[data-theme="light"] .contact-form textarea {
    background: rgba(0, 0, 0, 0.03);
    color: var(--text-primary);
}

[data-theme="light"] .footer-wide {
    background: rgba(248, 250, 252, 0.6);
}

[data-theme="light"] .avatar-img {
    border-color: rgba(0, 0, 0, 0.1);
}

[data-theme="light"] .badge-education {
    background: rgba(14, 165, 233, 0.06);
}

"""
        new_lines.append(overrides)
        
    if line_num == 372:
        hero_visual = """/* Hero Visual (Avatar + Stats) */
.hero-visual {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

"""
        new_lines.append(hero_visual)
        
    if line_num == 1148:
        mq992_add = """    .hero-visual {
        margin-top: 2rem;
    }

    .hero-socials {
        justify-content: center;
    }

    .stats-grid {
        margin: 1.5rem auto 0;
    }
"""
        line = line + mq992_add
        
    if line_num == 1192:
        mq768_add = """    .project-card-heading {
        font-size: 1.1rem;
    }

    .hero-buttons {
        flex-direction: column;
        align-items: center;
        gap: 0.8rem;
    }
"""
        line = line + mq768_add
        
    new_lines.append(line)

with open('style.css', 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print('Rewrite complete!')
