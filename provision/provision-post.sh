#!/usr/bin/env bash

set -ex

sudo -u postgres psql -h localhost -U ut -d ut < ut.dump
