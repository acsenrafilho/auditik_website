from __future__ import annotations

import random
import time


def sleep_with_jitter(delay_min: float, delay_max: float) -> None:
    if delay_max <= 0:
        return
    low = max(0.0, delay_min)
    high = max(low, delay_max)
    time.sleep(random.uniform(low, high))
