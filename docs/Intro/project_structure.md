# Tinker Docs的文件结构

Tinker Docs基于[Docusaurus 2](https://docusaurus.io/docs/installation)构建，整体文件结构改动不大，以下说明撰写文档和博客时需要设计的部分。

```
tinkerdocs
├── blog/
└── docs/
    ├── Intro/
    ├── Arm/
    ├── Audio/
    ├── Chasis/
    ├── Hardware/
    ├── Navigation/
    ├── Program/
    ├── Vision/
    └── <待增加文件夹>
```

## `blog`

此文件夹用于存放日常博客，可直接将记录博客的`md`或`mdx`文件置于此文件夹下。



## `docs`

此文件夹用于存放技术文档，可将记录技术文档的`md`或`mdx`文件置于此文件夹下的相应子文件夹中。如需添加子主题，可直接自行创建子文件夹。