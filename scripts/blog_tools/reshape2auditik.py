#!/usr/bin/env python3
"""Wrapper de compatibilidade — use reshape_blog_post.py."""

from __future__ import annotations

import warnings

from reshape_blog_post import main

warnings.warn(
    "reshape2auditik.py está obsoleto. Use reshape_blog_post.py.",
    DeprecationWarning,
    stacklevel=1,
)

if __name__ == "__main__":
    main()
